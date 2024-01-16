import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {io} from "socket.io-client";
import {message} from "antd";
import {listenFrindRequests, listenMessages, listenTyping} from "../Sockets/ListenRequests";
import {addNewMessage} from "../slices/messageSlice";
import {setUnseenMsg} from "../slices/connectionSlice";

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
        listenFrindRequests(soc,()=>{});
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
        console.log("Sending,,,,")
        socket.emit('friend-request',message);
    }



    return {socket,sendMessage,sendConnectionRequestNotifs};


}