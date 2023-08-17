export const sendMessage = (socket:any,message:any)=>{
    socket.emit('message-personal-server',message);
}

export const sendConnectionRequest = (socket:any,message:any)=>{
    socket.emit('friend-request',message);
}