import React, { createContext, useReducer } from 'react'

export const AppContext = createContext({});
const LOGOUT='LOGOUT';
const LOGIN = 'LOGIN';
const ONLINE = "ONLINE"

const reducer = (state:any,action:any) =>{
    switch (action.type){
        case LOGIN:
            return {...state,isLoggedIn:true,authToken:action.payload.token, username:action.payload.username}
        case LOGOUT:
            return {...state, isLoggedIn:false , authToken:null, username:null};
        case ONLINE:
          return {...state , ...action.payload}
        
    } 
}

export default function AppProvider({children}:any) {
  const initialState = {
    isLoggedIn:false,
    authToken:null,
    username:null,
    isOnline:false,
    socket:null
    };
  const [state,dispatch] = useReducer(reducer,initialState);


  return (
   <AppContext.Provider value={{state,dispatch}}>
        {children}
   </AppContext.Provider>
  )
}
