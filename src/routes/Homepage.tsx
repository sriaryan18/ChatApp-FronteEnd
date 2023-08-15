import { Header } from 'antd/es/layout/layout';
import ContackList from '../components/ContactList';
import MessageArea from '../components/MessageArea';

export default function Homepage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column',flex:1, height:'98vh'}}>
      
      <Header title='ChatApp' style={{backgroundColor:'#7c7fd9'}} >
        
      </Header>

      <div style={{ display: 'flex'}}>
        <div style={{ flex: '0.2', backgroundColor: '#e1e6e2' }}>
          <ContackList/>
        </div>
        <div style={{ flex: '0.8', backgroundColor: '#e1e6e2' }}>
          <MessageArea />
          
        </div>
      </div>
    </div>
  );
}
