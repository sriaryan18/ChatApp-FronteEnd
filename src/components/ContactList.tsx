import { Avatar, List, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { GetConnections } from '../utils/connections';
import { AppContext } from '../AppContext';

export default function ContackList() {

  const context:any = useContext(AppContext);
  const [connections,setConnections]:any = useState(null);
  const [activeConnect,setActiveConnect]=useState<null | Number>(null);
  const [data,setData]  = useState([]);
  const token = context?.state?.authToken;
  const username = context?.state?.username;

  useEffect(()=>{
    async function fetchConnections() {
      if(!connections){
        const response:any =  await GetConnections(username,token);
        if(response.status == 200){
          setConnections(response.data);
        }
      }
    } 
    fetchConnections();

  },[]);

  useEffect(()=>{
    if(connections){
       const d=connections.map((item:any)=>{
        return {
          title:item?.username
        }
       })
       setData(d);
    }
  },[connections]);


  return (
    <div style={{overflowY:'hidden',height:"98vh"}}>
     <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item:any, index) => (

      <List.Item onClick={(val)=>{console.log("first",index);setActiveConnect(index)}} style={{cursor:'pointer', overflow:'auto'}}  >
        <List.Item.Meta
           style={{
                    backgroundColor:activeConnect === index?'#afb3b0':'#f2f2f0',
                    height:65,
                    display:'flex',
                    padding:5, 
                    margin:5  , 
                    borderRadius:10, 
                    alignItems:'center',
                  }}
           
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} size={55}/>}
          title= {<h2>{item.title}</h2>}//{<a href="https://ant.design">{item.title}</a>}

        />
      </List.Item>

    )}
  />
    </div>
  )
}
