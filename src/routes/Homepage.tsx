import { Header } from 'antd/es/layout/layout';
import MessageArea from '../components/MessageArea';
import { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import { listenFrindRequests, listenMessages, listenTyping } from '../Sockets/ListenRequests';
import { sendConnectionRequest, sendMessage } from '../Sockets/SendMessages';
import ContactList from '../components/ContactList';
import { Input, Modal, message } from 'antd';
import ModalComp from '../components/Modal';
import { CheckUserNameAvailable } from '../utils/handleSignUp';

export default function Homepage() {
  const appContext:any = useContext(AppContext);
  const [activeUser,setActiveUser] = useState('khattu');  
  const [showSendConnectionRequestModal,setShowSendConnectionRequestModal] = useState(false);
  const [searchedUsername,setSearchedUsername] = useState("")
  const username = appContext.state.username;
  const socket = appContext?.state.socket;

  if(socket){
    listenFrindRequests(socket);
    listenTyping(socket);
    listenMessages(socket);
  }

  const handleSendRequest = async ()=>{
    if(searchedUsername){
      const res=await CheckUserNameAvailable(searchedUsername);
      if(res == true){
          message.error("No Username available");
          setSearchedUsername("");
          return;
      }else{
         sendConnectionRequest(socket,{to:searchedUsername,from:username});
      }
    }
    setSearchedUsername("");
    setShowSendConnectionRequestModal(false);
    
  }
  
  const handleUsernameChange = async (val:any)=>{
    setSearchedUsername(val.target.value);
  }

  const sendMessageToUser = (msg:any)=>{
    console.log("I am message",msg  );
    let messageToSend = {
      to:activeUser , // this will be fetched from a useState
      message:msg,
      from:username
    }
    sendMessage(socket,messageToSend);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column',flex:1, height:'98vh'}}>
      
      <Header title='ChatApp' style={{backgroundColor:'#7c7fd9'}} >
        
      </Header>

      <div style={{ display: 'flex'}}>
        <div style={{ flex: '0.2', backgroundColor: '#e1e6e2' }}>
          <ContactList setCurrentActiveUser={setActiveUser} showRequestModal = {setShowSendConnectionRequestModal}/>
        </div>
        <div style={{ flex: '0.8', backgroundColor: '#e1e6e2' }}>
          <MessageArea sendMessage={sendMessageToUser}/>
        </div>
        <ModalComp open={showSendConnectionRequestModal}
         onCancel={()=>setShowSendConnectionRequestModal(false)}
          onOk ={handleSendRequest}
         >
          <h2>Enter Username to send connection request</h2>
          <Input 
            value={searchedUsername}
            onChange={handleUsernameChange}
            onPressEnter={handleSendRequest}
           
          />
        </ModalComp>
      </div>
    </div>
  );
}
