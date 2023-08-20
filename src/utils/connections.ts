
import api from "./Axios";

export const GetConnections = async (username:string,token:string)=>{
    
    if(!token){
        return {
            error:'Not authorized',
            status:400
        }
    }
    const requestHeader = {
        'Authorization':token
    }
    const response = await api.get(`user/get-connections?username=${username}`,null,requestHeader);
    return response;
}

export const GetNotifications = async(token:string,username:string,offset:number) =>{
    if(!token){
        return {
            error:'Not Authorized',
            status:400
        }
    }
    const requestHeader = {
        'Authorization':token
    }
    const response =await api.get(`user/notifications/get-notifications?username=${username}&offset=${offset}`,null,requestHeader);
    // console.log("I am response of get-notifications api",response)
    return response;
}