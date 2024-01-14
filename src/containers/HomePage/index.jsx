import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {triggerSockets} from "../../utils/SendSocketMessage";
import {message} from "antd";
import {listenFrindRequests, listenMessages, listenTyping} from "../../Sockets/ListenRequests";
import {ItemWrapper, StyledContactListContainer} from "./Styles.js";
import ContactList from "../../components/ContactList/index";

export default function HomePage(){

    const authSelector = useSelector(state => state.auth);
    const {username , token} = authSelector;
    const socketRef = useRef(null);

    // initialization of all type of event listener related to sockets should happen here.
    useEffect(()=>{
        socketRef.current = triggerSockets(token, username);
        if(socketRef.current){
            const {socket} = socketRef.current;
            listenMessages(socket,()=>console.log('Message'));
            listenFrindRequests(socket,()=>{});
            listenTyping(socket,()=>{});
        }
        return ()=>{
            const {socket} = socketRef.current;
            if(socket){
                socket.off('connect',message.info('Disconnected'))
                socket.off('message-personal',()=>{});
                socket.off('typing-personal',()=>{});
                socket.off('friendRequest',()=>{});
            }

        }
    },[token, username]);

    return (
        <ItemWrapper>
            <StyledContactListContainer>
                <ContactList/>
            </StyledContactListContainer>
        </ItemWrapper>
    )
}