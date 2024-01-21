import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {io} from "socket.io-client";
import {message} from "antd";
import {listenFrindRequests, listenMessages, listenTyping} from "../Sockets/ListenRequests";
import {addNewMessage} from "../slices/messageSlice";
import {addConnections, setUnseenMsg} from "../slices/connectionSlice";
import {addNotification} from "../slices/authSlice.js";
import {constants} from "../utils/Constants";
import {GetConnections} from "../utils/connections";

export default function useSocket(){
    const [socket , setSocket] = useState(null);
    const {token,username} = useSelector(state => state.auth);
    const {activeChatId} = useSelector(state => state.connection);
    const dispatch = useDispatch();
    useEffect(() => {
        const soc=  io(import.meta.env.VITE_SOCKET_HOST, {
            query: {
                token: token
            }
        });
        soc.on('connect',()=>{
            message.info("You are now Online");
            soc.emit("iAmOnline",{username})
        });
        listenFrindRequests(soc,receiveNotifications);
        listenTyping(soc,()=>{});
        setSocket(soc);
        return ()=>{
            if(socket){

                socket.removeAllListeners("message-personal");
                socket.removeAllListeners("connect");
                socket.removeAllListeners("typing-personal");
                socket.removeAllListeners("friendRequest");

            }

        }
    }, [token,username]);

    useEffect(() => {
        if(socket){
            socket.removeAllListeners("message-personal");
            listenMessages(socket,receiveMsg);
        }
    }, );

    const receiveNotifications =async  (data) => {
        dispatch(addNotification(data));
        if(data.type === constants.ACCEPT_TYPE){
            const response = await GetConnections(username, token);
            if (response.status === 200) {
                dispatch(addConnections(response.data));
            }
        }
    }

     const receiveMsg = (msg) => {
        const {chatId} = msg;
        if(chatId === activeChatId){
            dispatch(addNewMessage(msg));
        }else{
            dispatch(setUnseenMsg(chatId))
        }

     }
     const sendMessage = (message)=>{
        socket.emit('message-personal-server',message);
    }
     const sendConnectionRequestNotifs = (message)=>{
        socket.emit('friendRequest',message);
    }




    return {socket,sendMessage,sendConnectionRequestNotifs};


}