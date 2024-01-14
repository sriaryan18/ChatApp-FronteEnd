import {parse} from "flatted";
import {constants} from "./Constants.ts";

const {
    LISTEN_FRIEND_REQ,
    LISTEN_TYPING,
    LISTEN_MESSAGES
} = constants;
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
export function getIsLoggedIn(state:any){
    return !!(state.username && state.token);
}