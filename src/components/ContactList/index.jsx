import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {GetConnections} from "../../utils/connections";
import {addConnections , setActiveChatId} from '../../slices/connectionSlice';
import ContactListSkeleton from "./ContactListSkeleton";
import {Avatar, List} from "antd";
import {setMessagesOfActiveChat} from "../../slices/messageSlice.js";

export default function ContactList(){

    const dispatch = useDispatch();
    const connectionSelector = useSelector(state => state.connection);
    const authSelector = useSelector(state => state.auth);
    const {connections} = connectionSelector;
    function handleKeyPress(event){
        if(event.keyCode === 27){
            dispatch(setActiveChatId(''));
            dispatch(setMessagesOfActiveChat([]))
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        async function fetchConnections() { // TODO : modify this api to bring names as well
            if (!connections.length) {
                const { username, token} = authSelector;
                const response = await GetConnections(username, token);
                if (response.status === 200) {
                    dispatch(addConnections(response.data));
                }
            }
        }
         fetchConnections().then(()=>{});
        return ()=> {
            document.removeEventListener('keydown', handleKeyPress);

        }
    }, []);

    function handleClick(index){
       dispatch(setActiveChatId(connections[index]?.chatId))
    }

    const data = transformToDataSource(connections);
    const activeChatId = connectionSelector.activeChatId;
    return(
        <div className='contactList' style={{overflowY:'auto'}}>
            {
                connections.length ?
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item
                                onClick={() => handleClick(index)}
                                style={{cursor:'pointer'}}
                            >
                                <List.Item.Meta
                                    style={getListStyles(activeChatId,connections[index]?.chatId)}
                                    avatar={<Avatar
                                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                        size={55}
                                    />
                                }
                                    title= {
                                        <>
                                            <h2 style={getListItemStyle()}>
                                                {item.title}
                                                {item.unseenCount!==0? <div style={{marginRight:'10px'}}>
                                                    {item.unseenCount}
                                                </div>:null}
                                            </h2>

                                        </>
                                    }

                                />

                            </List.Item>
                        )}
                    />
                    : <ContactListSkeleton/>
            }
        </div>

    )
}



const getListStyles = (activeChatId,currentChatId) => {
    return {
        background : activeChatId === currentChatId ? 'gray' : 'white',
        // boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)',
        borderRadius: '5px',
        // padding: '1px',
        display: 'flex',
        alignItems: 'center',
        margin:'-5px'
    }
}

const getListItemStyle = () =>{
    return {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        // padding:'10px'
    }
}

const transformToDataSource =(data)=>{
    return data.map(item=>{
            return {
                title:item?.username,
                unseenCount:item?.unseenCount || 0
            }
        }
    ) // unseen count is only present in the messages from Kafka so it needs to be merged
}