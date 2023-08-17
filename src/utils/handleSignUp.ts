import api from "./Axios";
export const  SignUp = async (value:any)=>{
    const reqData ={    
    "username":value.username,
    "password":value.password,
    "name":value.fullName,
    "email":"sri.aryan18@gmail.com"
    }
    const response = await api.post("/user/register",reqData);
}

export const CheckUserNameAvailable = async (username:any) =>{
    const response = await api.get(`/user/checkUserName?username=${username}`);
    return response.data
}