import { Avatar, FloatButton, List } from 'antd';
import {  useEffect, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons';

export default function ContactList({setCurrentActiveUserChatId,showRequestModal,connections,setActiveUserName}:any) {
  const [activeConnect,setActiveConnect]=useState<null | Number>(null);
  const [data,setData]  = useState<any>([]);

 
  useEffect(()=>{
    if(connections){
      const ds = transformToDataSource(connections);
      setData(ds);
    }
  },[connections]);

  const handleConnectionClick = (index:number)=>{
    setActiveConnect(index);
    setCurrentActiveUserChatId(connections[index].chatId);
    setActiveUserName(connections[index].username);
  }
  
  const transformToDataSource =(data:[])=>{
     return data.map(item=>{return {title:item?.["username" as keyof Object]}})
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
            <h2>{item.title}</h2>
          
          </>
          }//{<a href="https://ant.design">{item.title}</a>}

          />
        
      </List.Item>
    )}
  />

    </div>
  )
}
