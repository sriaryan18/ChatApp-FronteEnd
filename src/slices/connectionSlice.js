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
    }
})

function addNewConnectionFn(state , action){
    
}

function addConnectionsFn(state,action){
    const  connections  = action.payload;
    state.connections = [...connections];
}

function setActiveChatIdFn(state , action){
    state.activeChatId = action.payload;
}
export const {addNewConnection,
    addConnections,
    setActiveChatId } = connectionSlice.actions;
export default connectionSlice.reducer;