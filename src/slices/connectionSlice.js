import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    connections:[],
    count: 0,
    activeChatId:'',
}

export const connectionSlice = createSlice({
    name : 'connectionSlice',
    initialState,
    reducers:{
        addNewConnection : (state,action) => addNewConnectionFn(state,action),
        addConnections : (state,action) => addConnectionsFn(state,action),
        setActiveChatId : (state , action) => setActiveChatIdFn(state,action),
        setUnseenMsg : (state, action) => setUnseenMsgFn(state, action),
    }
})

function addNewConnectionFn(state , action){
    state.connections = [...state.connections,action.payload];
}

function setUnseenMsgFn(state,action){
    const chatId = action.payload;
    state.connections = state.connections.map((item) => {
        if (item.chatId === chatId) {
            item.unseenCount = (item.unseenCount ?? 0) + 1;
        }
        return item;
    });
}

function addConnectionsFn(state,action){
    const  connections  = action.payload;
    state.connections = [...connections];
}

function setActiveChatIdFn(state , action){
    const  chatId= action.payload;
    state.activeChatId = chatId;
    state.connections = state.connections.map((item) => {
        if (item.chatId === chatId) {
            item.unseenCount = 0;
        }
        return item;
    });
}
export const {addNewConnection,
    addConnections,
    setActiveChatId,
    setUnseenMsg} = connectionSlice.actions;
export default connectionSlice.reducer;