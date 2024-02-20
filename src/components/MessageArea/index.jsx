import {useDispatch, useSelector} from "react-redux";

import image from '../../assets/NoMsg.jpeg'
import {Image} from './styles.js'
import {useEffect, useMemo} from "react";
import {GetMessagesFromChatId} from "../../utils/Messages";
import {message} from "antd";
import {setMessagesOfActiveChat} from "../../slices/messageSlice";
import {preProcessMessages} from "./helper.js";
import MessageList from "./MessageList.jsx";
import MessageBox from "./MessageBox.jsx";


export default function MessageArea(){

    const activeChatId = useSelector(state => state.connection.activeChatId);
    const {token,username} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const messages = useSelector(state => state.messages.messages);
    const preProcessedMsg = useMemo(()=> {
        if(messages.length)
            return preProcessMessages(messages);
    },[messages]);


    useEffect(() => {
        async function fetchMessages(chatID) {
            const messagesOfChat = await GetMessagesFromChatId(chatID, token);
            if (messagesOfChat.status === 200) {
                dispatch(setMessagesOfActiveChat(messagesOfChat.data));
            } else {
                message.error("Error fetching chats ");
            }
        }
        if(activeChatId)
        fetchMessages(activeChatId).then(() => {});
    }, [activeChatId]);
    return( // TODO : adjust this to make conditional rendering logic maintainable
        <div style={{overflowY: 'auto',display:'flex',flexDirection:'column',flex:1}}>
            <div className='messageArea' style={{overflowY: 'auto',flex:1,display:'flex'}}>
                {
                    !activeChatId ?
                        <Image src={image}/> : (
                            <>
                                <MessageList
                                    messages={preProcessedMsg}
                                    username={username}
                                />
                            </>
                        )
                }
            </div>
            {activeChatId && <MessageBox key={activeChatId}/>}
        </div>

    );
}