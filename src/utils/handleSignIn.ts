import { message } from "antd";
import api from "./Axios"

interface loginData{
    username:String,
    password:String
}
export const SignIN = async (value:loginData)=>{
    try{
        const response  = await api.post('user/login',value);
        console.log("I am response data ",response.data);
        if(response.status === 200){
         message.info("LOGIN SUCCESSFUL");
         return response;
        }
    }catch(err){
         message.info("LOGIN FALIED")
         console.log("I a err at login",err);
         return {data:null}
    }
}