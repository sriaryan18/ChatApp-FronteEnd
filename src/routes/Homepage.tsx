import React from 'react';
import ContackList from '../components/ContactList';
import MessageArea from '../components/MessageArea';

export default function Homepage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '5px',flex:1}}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0.3', backgroundColor: 'white' }}>
          <ContackList username="testUser"/>
        </div>
        <div style={{ flex: '0.7', backgroundColor: 'red' , height:'98vh' }}>
          <MessageArea />
          
        </div>
      </div>
    </div>
  );
}
