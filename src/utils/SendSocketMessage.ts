import { message } from 'antd';
import {io} from 'socket.io-client';
export const triggerSockts = async (token:string,username:string)=>{
    const socket = io(import.meta.env.VITE_SOCKET_HOST,{
        query:{
            token:token
        }
    });
    socket.on('connect',()=>{
        console.log("User Online");
        message.info("You are now Online");
        socket.emit("iAmOnline",{username:username});
    });
   
  
    
    return {
        socket,
        isOnline:true
    };
}