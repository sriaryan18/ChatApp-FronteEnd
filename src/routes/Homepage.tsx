import { Header } from 'antd/es/layout/layout';
import ContackList from '../components/ContactList';
import MessageArea from '../components/MessageArea';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function Homepage() {

  const appContext = useContext(AppContext);

  const sendMessage = (msg:any)=>{
    console.log("I am message",msg)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column',flex:1, height:'98vh'}}>
      
      <Header title='ChatApp' style={{backgroundColor:'#7c7fd9'}} >
        
      </Header>

      <div style={{ display: 'flex'}}>
        <div style={{ flex: '0.2', backgroundColor: '#e1e6e2' }}>
          <ContackList/>
        </div>
        <div style={{ flex: '0.8', backgroundColor: '#e1e6e2' }}>
          <MessageArea sendMessage={sendMessage}/>
          
        </div>
      </div>
    </div>
  );
}
