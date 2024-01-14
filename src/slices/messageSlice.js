import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages:[],
    activeChatId : '',
}

export const messageSlice = createSlice({
    name: 'message',
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