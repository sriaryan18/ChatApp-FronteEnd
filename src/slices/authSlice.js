import {createSlice} from "@reduxjs/toolkit";
import {triggerSockets} from "../utils/SendSocketMessage";


const initialState = {
    username:'',
    name:'',
    email:'',
    token:'',
    profileImg:'',
    notifications:[],
    socket:null,
};

export const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
       setAuthData : (state,action) => setAuthDataFn(state,action),
       resetAuthData : (state) => resetAuthDataFn(state),
    }
})


function setAuthDataFn(state,action){
    const { token, userInfo} = action.payload;
   const {username,name,email,notifications = {sent:[],received:[]}} = userInfo;
    const socket = triggerSockets(token,username);
   state = {
       ...state,
       username,
       name,
       email,
       notifications,
       token,
       socket
   }
   return state;
}

function resetAuthDataFn(state){
    return {...state, ...initialState};
}


export const {setAuthData , resetAuthData,setIsOnline } = authSlice.actions;

export default authSlice.reducer;
