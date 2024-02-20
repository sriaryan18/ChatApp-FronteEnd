import { message } from "antd";
import api from "./Axios"

interface loginData{
    username:String,
    password:String
}
export const SignIN = async (value:loginData)=>{
    try{
        const response  = await api.post('user/login',value);
        if(response.status === 200){
         return response;
        }
    }catch(err){
         message.error("LOGIN FALIED")
         return {data:null}
    }
}