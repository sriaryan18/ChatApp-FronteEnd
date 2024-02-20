export const sendMessage = (socket:any,message:any)=>{
    socket.emit('message-personal-server',message);
}

export const sendConnectionRequestNotifs = (socket:any,message:any)=>{ 
    console.log("Sending,,,,")
    // socket.emit('friendRequest',message);
}

