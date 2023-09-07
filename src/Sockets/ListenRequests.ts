export const listenFrindRequests = (socket:any,setNotification:Function) =>{
    console.log("friendrequet Listening.....")
    socket.on('friendRequest',(data:any)=>{
        console.log('I received a friend request',data);
        setNotification(data);
    });
}   

export const listenMessages = (socket:any,updateConnection:Function)=>{
    socket.on('message-personal',(data:any)=>{
        console.log("I received a message",data);
        updateConnection(data);
    });
};

export const listenTyping =(socket:any)=>{
    socket.on('typing-personal',(data:any)=>{
        console.log('I received a typing ', data)
    });
}