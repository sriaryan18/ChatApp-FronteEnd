import {parse} from "flatted";


export type userCreds = {
    username:string,
    socket : object,
    token: string,
}
export const getUserCreds = () : userCreds | null => {
    let   socket ,userInfo;
    try{
        userInfo = parse(sessionStorage.getItem('userInfo'));
        socket = parse(sessionStorage.getItem("socket"));
        return {username:userInfo.userInfo.username,socket:socket.socket,token:userInfo.token}
    }catch (err){
        console.log('err',err)
    }
    return null;

}