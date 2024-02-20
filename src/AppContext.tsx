import React, { createContext, useReducer } from 'react'
import {getUserCreds} from "./utils/utils.ts";
import {triggerSockets} from "./utils/SendSocketMessage.ts";
import {useNavigation} from "react-router-dom";

export const AppContext = createContext({});
const LOGOUT='LOGOUT';
const LOGIN = 'LOGIN';
const ONLINE = "ONLINE"
const initialState = {
    isLoggedIn:false,
    authToken:null,
    userInfo:null,
    isOnline:false,
    socket:null
};
const reducer = (state:any,action:any) =>{
    switch (action.type){
        case LOGIN:
            return {...state,isLoggedIn:true,authToken:action.payload.token, userInfo:action.payload.userInfo}
        case LOGOUT:
            return {...state, isLoggedIn:false , authToken:null, username:null};
        case ONLINE:
          return {...state , socket:action.payload.socket,isOnline:action.payload.isOnline}
        
    } 
}

export default function AppProvider({children}:any) {
    // const navigate = useNavigation();
  const [state,dispatch] = useReducer(reducer,initialState);
  const getSocket =  () => {
      const socket = state.socket;
      if(socket) return socket;
      else {
          const {username , token} : any = getUserCreds();
          if(username && token){
              const onlineResponse =  triggerSockts(token,username);
              dispatch({
                  type:"ONLINE",
                  payload:{...onlineResponse}
              });
              return onlineResponse.socket;
          }
      }
      // navigate('/');
  }

  return (
   <AppContext.Provider value={{state,dispatch,getSocket}}>
        {children}
   </AppContext.Provider>
  )
}
