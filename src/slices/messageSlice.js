import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages:[],
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers:{
        addNewMessage : (state,action) => addNewMessageFn(state,action),
        setMessagesOfActiveChat : (state,action) => setMessagesOfActiveChatFn(state,action),
    }
})

function addNewMessageFn(state,action){
    state.messages = [...state.messages,action.payload];

}
function setMessagesOfActiveChatFn(state,action){
    state.messages = [...action.payload];
}

export const { addNewMessage,setMessagesOfActiveChat } = messageSlice.actions;

export default messageSlice.reducer;