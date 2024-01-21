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
        addNotification : (state,action) => addNotificationFn(state,action),
        deleteNotifications : (state,action) => deleteNotificationsFn(state,action),
    }
})


function setAuthDataFn(state,action){
    const { token, userInfo} = action.payload;
   const {username,name,email,notifications = {sent:[],notificationsReceived:[]}} = userInfo;
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

function addNotificationFn(state,action){
    let {notifications = []} = state;
    if(notifications && notifications.length){
        notifications.notificationsReceived.push(action.payload);
    }else {
        notifications.notificationsReceived = [action.payload];
    }
    state.notifications = notifications;
}
function deleteNotificationsFn(state,action){
    const {username,type} = action.payload;
    const {notifications:{notificationsReceived} = []} = state;
    state.notifications.notificationsReceived = notificationsReceived.filter(notif => {
        if (notif.originatedFromUsername !== username && notif.type !== type) {
            return notif;
        }
    });
}


export const {setAuthData
    , resetAuthData,
    setIsOnline,
    addNotification,
    deleteNotifications} = authSlice.actions;

export default authSlice.reducer;
