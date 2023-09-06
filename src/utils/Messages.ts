import api from "./Axios";

export const GetMessagesFromChatId =  async (chatId:string,token:string)=>{
    if(!token){
        return {
            error:'Not Authorized',
            status:400
        }
    }
    const requestHeader = {
        'Authorization':token
    }
    const response =await api.get(`chat?chatID=${chatId}`,null,requestHeader);
    // console.log("I am response of get-notifications api",response)
    return response;
}
