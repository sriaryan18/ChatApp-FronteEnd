import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import MessageList from './MessageList'
import { useState } from 'react'

export default function MessageArea({sendMessage}:any) {

  const [textInput,setTextInput] = useState('');
  const handleTextInputChange = (val:any)=>{
    setTextInput(val.target.value);
  }
  const handleClick = ()=>{
    sendMessage(textInput);   
    setTextInput('');    
    
  }
 
  return (
   <div style={{height:'88vh',display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex',flex:0.92,overflowY:'auto'}}>
        <MessageList/>
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

