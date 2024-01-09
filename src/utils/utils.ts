import {parse} from "flatted";


export type userCreds = {
    username:string,
    token: string,
}
export const getUserCreds = () : userCreds | null => {
    let   userInfo;
    try{
        userInfo = parse(sessionStorage.getItem('userInfo'));
        return {username:userInfo.userInfo.username,token:userInfo.token}
    }catch (err){
        console.log('err',err)
    }
    return null;

}