import { Avatar, FloatButton, List } from 'antd';
import { useContext, useEffect, useState } from 'react'
import { GetConnections } from '../utils/connections';
import { AppContext } from '../AppContext';
import { PlusOutlined } from '@ant-design/icons';

export default function ContactList({setCurrentActiveUser,showRequestModal}:any) {
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

  const handleConnectionClick = (index:number)=>{
    setActiveConnect(index);
    setCurrentActiveUser(connections[index].username);
  }
  


  return (
    <div style={{overflowY:'auto', backgroundColor:'white', height:'90vh',position:'relative'}}>
      <FloatButton 
        style={{position:'absolute', backgroundColor:'#7c7fd9' }} tooltip="Add New Connects"
        icon={<PlusOutlined/>}
        onClick={()=>{showRequestModal(true)}}
       />  
     <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item:any, index) => (
      <List.Item onClick={()=>handleConnectionClick(index)} style={{cursor:'pointer'}}  >
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
