import { Avatar, FloatButton, List } from 'antd';
import {  useEffect, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons';

export default function ContactList({setCurrentActiveUserChatId,showRequestModal,connections,setActiveUserName,fetchMessages,setConnections}:any) {
  const [activeConnect,setActiveConnect]=useState<null | Number>(null);
  const [data,setData]  = useState<any>([]);

 
  useEffect(()=>{
    if(connections){
      const ds = transformToDataSource(connections);
      console.log("I sm ds",ds)
      setData(ds);
    }
  },[connections]);

  const handleConnectionClick = (index:number)=>{
    setActiveConnect(index);
    setCurrentActiveUserChatId(connections[index].chatId);
    setActiveUserName(connections[index].username);
    fetchMessages(connections[index].chatId);
    const con = connections;
    con[index]['unseenCount']=0;
    setConnections([...con]);
  }
  
  const transformToDataSource =(data:[])=>{
     return data.map(item=>{return {title:item?.["username" as keyof Object],unseenCount:item?.['unseenCount' as keyof Object] || 0}}) // unseen count is only present in the messages from Kafka so it needs to be merged 
  } 


  return (
    <div style={{overflowY:'auto', 
    background:'#e9f0e6',
    position:'relative',display:'flex',
    flex:1,height:"100%", 
    flexDirection:'column',
    
    borderColor:'blue'
    }}>
      <FloatButton 
        style={{position:'absolute', backgroundColor:'#7c7fd9' }} tooltip="Add New Connects"
        icon={<PlusOutlined/>}
        onClick={()=>{showRequestModal(true)}}
       />  
     <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item:any, index) => (
        <List.Item 
          onClick={()=>handleConnectionClick(index)} 
          style={{cursor:'pointer'}}  
        >
          <List.Item.Meta
            style={{
                      backgroundColor:activeConnect === index?'#afb3b0':'#f2f2f0',
                      height:65,
                      display:'flex',
                      padding:5, 
                      marginRight:5,
                      marginTop:5, 
                      borderRadius:10, 
                    
                    }}
            
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} size={55}/>}
            title= {
              <>
            <h2 style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
              {item.title}
             {item.unseenCount>0? <div style={{borderRadius:50,background:'green' , display:'flex',justifySelf:'flex-end',flex:0.1,justifyContent:'center'}}>
                {item.unseenCount}
              </div>:null}
              </h2>
          
          </>
          }//{<a href="https://ant.design">{item.title}</a>}

          />
        
      </List.Item>
    )}
  />

    </div>
  )
}
