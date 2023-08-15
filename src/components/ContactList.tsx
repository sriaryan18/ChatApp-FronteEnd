import { Avatar, List, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { GetConnections } from '../utils/connections';
import { AppContext } from '../AppContext';

export default function ContackList({username}:any) {

  const context:any = useContext(AppContext);
    const token = context?.state?.authToken;
  const [connections,setConnections]:any = useState(null);
  const [data,setData]  = useState([]);

  useEffect(()=>{
    async function fetchConnections() {
      if(!connections){
        const response:any =  await GetConnections(username,token);
        console.log("I am response data",response.data)
        if(response.status == 200){
          setConnections(response.data);
        }
      }
    } 
    fetchConnections();

  },[]);

  useEffect(()=>{
    if(connections){
       console.log("I am connections",connections)
       const d=connections.map((item:any)=>{
        console.log("I am item",item)
        return {
          title:item?.username
        }
       })
       setData(d);
    }
  },[connections]);


  return (
    <div style={{overflowY:'scroll',height:"98vh"}}>
     <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item:any, index) => (

      <List.Item onClick={(val)=>console.log("first",index)} style={{cursor:'pointer'}} >
        <List.Item.Meta
           
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title= {item.title}//{<a href="https://ant.design">{item.title}</a>}
          

        />
      </List.Item>

    )}
  />
    </div>
  )
}
