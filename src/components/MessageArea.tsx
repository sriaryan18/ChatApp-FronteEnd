import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import MessageList from './MessageList'
import { useState} from 'react'
import {getUserCreds, userCreds} from "../utils/utils.ts";
import {useNavigate} from "react-router-dom";

export default function MessageArea({sendMessage,messages,setMessagesOfActiveChat}:any) {

  const [textInput,setTextInput] = useState('');
    const navigate = useNavigate();
    let creds : userCreds | null = null;
    try{
        creds=getUserCreds();
    }catch (err){
        navigate('/')
    }
    const username  = creds?.username || '';
  const handleTextInputChange = (val:any)=>{
    setTextInput(val.target.value);
  }
  const handleClick = ()=>{
    sendMessage(textInput);   
    setTextInput('');    
    const msg = [...messages];
    const toBePushed = {
      message:textInput,
        sender:username
    }
    msg.push(toBePushed);
    setMessagesOfActiveChat(()=>[...msg]);
  }
 
  return (
   <div style={{height:'88vh',display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex',flex:0.92,overflowY:'auto'}}>
        <MessageList messages={messages} setMessagesOfActiveChat={setMessagesOfActiveChat}/>
      </div>
      <div style={{display:'flex',flex:0.08, margin:20}}>
         <Input
            style={{height:"100%", fontSize:20,flex:0.99, margin:2}}
            placeholder='Start Typing....'
            onPressEnter={handleClick}
            value={textInput}
            onChange={handleTextInputChange}
          />
           <Button style={{
            flex:0.01, 
            height:"100%", 
            backgroundColor:'#7c7fd9',
            borderRadius:100,
            marginLeft:5
          }}
          onClick={handleClick}
          >
            <SendOutlined/>
          </Button>
      </div>
   </div>
  )
}

