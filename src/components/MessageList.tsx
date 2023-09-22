import { FloatButton, List } from 'antd'
import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../AppContext.tsx";

export default function MessageList({messages,setMessagesOfActiveChat}:any) {
    // const data = [
        // {
        //     title:'HI'
        // },
        // {
        //     title:'HI'
        // },

        // {
        //     title:'HI'
        // }, {
        //     title:'HI'
        // } ,{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // },{
        //     title:'HI'
        // }

    // ]
    const [data,setData] = useState([]);
    const appContext = useContext(AppContext);
    const username = appContext.state.userInfo.username;
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
    },[messages])
  return (
        <div style={{ flexDirection:'column', flex:1,}}>
        <List
            dataSource={data}
            itemLayout="horizontal"
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
