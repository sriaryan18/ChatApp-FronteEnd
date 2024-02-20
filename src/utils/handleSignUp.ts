import api from "./Axios";
export const  SignUp = async (value:any)=> {

    return await api.post("/user/register", value);
}

export const CheckUserNameAvailable = async (username:any) =>{
    const response = await api.get(`/user/checkUserName?username=${username}`);
    return response.data
}