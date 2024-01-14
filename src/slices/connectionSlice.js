import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    connections:[],
    count: 0
}

export const connectionSlice = createSlice({
    name : 'connectionSlice',
    initialState,
    reducers:{
        addNewConnection : (state,action) => addNewConnectionFn(state,action),
    }
})

function addNewConnectionFn(state , action){
    
}