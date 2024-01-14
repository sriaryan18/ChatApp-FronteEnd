import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages:[],
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers:{
        addNewMessage : (state,action) => addNewMessageFn(state,action),
    }
})

function addNewMessageFn(state,action){
    // const newMessage = action.payload;
    // const {to , from , message, chatId} = newMessage;

}

export const { addNewMessage } = messageSlice.actions;

export default messageSlice.reducer;