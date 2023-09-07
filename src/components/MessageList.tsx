import { FloatButton, List } from 'antd'
import React, { useEffect, useState } from 'react'

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
    
    useEffect(()=>{

        const preProcessMessages = ()=>{
            if(!messages) return;
           return  messages.map((item:any)=>{
                return {
                    title:item.message
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
                return (
                    <List.Item.Meta
                        title={
                            <div style={{display:'flex', flexDirection:'row', justifyContent:index%2==0?'flex-end':'flex-start'}}>
                            <div style={{  backgroundColor:index%2==0?"#76b586":"white", display:'flex', justifyContent:index%2==0?'flex-end':'flex-start', borderRadius:10, margin:15}}>
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
