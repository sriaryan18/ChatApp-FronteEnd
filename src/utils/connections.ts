
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
    const response = api.get(`user/get-connections?username=${username}`,null,requestHeader);
    return response;
}