export const listenFrindRequests = (socket:any) =>{
    socket.on('friendRequest',(data:any)=>{
        console.log('I received a friend request',data)
    });
}   

export const listenMessages = (socket:any)=>{
    socket.on('message-personal',(data:any)=>{
        console.log("I received a message",data);
    });
};

export const listenTyping =(socket:any)=>{
    socket.on('typing-personal',(data:any)=>{
        console.log('I received a typing ', data)
    });
}