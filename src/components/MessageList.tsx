import { List } from 'antd'
import React from 'react'

export default function MessageList() {
    const data = [
        {
            title:'HI'
        },
        {
            title:'HI'
        },
        {
            title:'HI'
        }, {
            title:'HI'
        } ,{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        },{
            title:'HI'
        }

    ]
  return (
        <div style={{ flexDirection:'column', flex:1,}}>
        <List
            dataSource={data}
            itemLayout="horizontal"
            renderItem={(item,index)=>{
                return (
                    <List.Item.Meta
                        title={
                            <div style={{display:'flex', flexDirection:'row', justifyContent:index%2==0?'flex-end':'flex-start'}}>
                            <div style={{  backgroundColor:index%2==0?"#76b586":"white", display:'flex', justifyContent:index%2==0?'flex-end':'flex-start', borderRadius:10, margin:15}}>
                                <h2 style={{margin:15}}>{item.title} </h2>
                               
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
