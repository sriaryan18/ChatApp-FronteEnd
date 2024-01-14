import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    username:'',
    name:'',
    email:'',
    token:'',
    profileImg:'',
    notifications:[],
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
   state = {
       ...state,
       username,
       name,
       email,
       notifications,
       token,
   }
   return state;
}

function resetAuthDataFn(state){
    return {...state, ...initialState};
}


export const {setAuthData , resetAuthData,setIsOnline } = authSlice.actions;

export default authSlice.reducer;
