import ContackList from '../components/ContactList';
import MessageArea from '../components/MessageArea';

export default function Homepage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '5px',flex:1}}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0.2', backgroundColor: 'white' }}>
          <ContackList/>
        </div>
        <div style={{ flex: '0.8', backgroundColor: '#e1e6e2' , height:'98vh' }}>
          <MessageArea />
          
        </div>
      </div>
    </div>
  );
}
