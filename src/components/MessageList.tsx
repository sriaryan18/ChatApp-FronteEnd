import {  List } from 'antd'
import React, { useEffect, useState} from 'react'
import {getUserCreds, userCreds} from "../utils/utils.ts";
import {useNavigate} from "react-router-dom";

export default function MessageList({messages,setMessagesOfActiveChat}:any) {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
   // const messageContainerRef = useRef(null);
    let creds : userCreds | null=null;
    try{
        creds=getUserCreds();
    }catch (err){
        navigate('/')
    }
    const username  = creds?.username || '';
    useEffect(()=>{
        const preProcessMessages = ()=>{
            if(!messages) return;
           return  messages.map((item:any)=>{
                return {
                    title:item.message,
                    sender:item.sender
                }
            })
        }
        const d = preProcessMessages();
        setData(d);

    },[messages]);
    useEffect(() => {
        scrollToBottom();
    }, [data]);
    const scrollToBottom = () => {
        const c =document.querySelector('.messagesArea');
        if (c) {
            c.scrollIntoView({block:'end', behavior: 'smooth', inline:'end' });
        }
    };
  return (
        <div style={{ flexDirection:'column', flex:1,}}  >
        <List
            dataSource={data}
            itemLayout="horizontal"
            className="messagesArea"
            renderItem={(item:any,index)=>{
                const orient = item.sender === username?true:false;
                return (
                    <List.Item.Meta
                        title={
                            <div style={{display:'flex', flexDirection:'row', justifyContent:orient?'flex-end':'flex-start'}}>
                            <div style={{  backgroundColor:orient?"#76b586":"white", display:'flex', justifyContent:orient?'flex-end':'flex-start', borderRadius:10, margin:15}}>
                                <h2 style={{margin:15}}>{item?.title || ""} </h2>
                            </div>
                            
                            </div>
                        }
                       
                        />
                );
            }}
        />
    
        </div>
   
  )
}
