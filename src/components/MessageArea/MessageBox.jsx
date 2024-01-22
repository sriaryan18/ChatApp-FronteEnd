import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useContext, useEffect, useRef, useState} from "react";
import {addNewMessage} from "../../slices/messageSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {SocketContext} from "../../utils/utils";

export default function MessageBox(){
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [value,setValue] = useState('');
    const {username} = useSelector(state => state.auth);
    const connection = useSelector(state => state.connection);
    const receiverObj = connection.connections.filter(con => con.chatId === connection.activeChatId)[0];
    const {sendMessage} = useContext(SocketContext);
    useEffect(() => {
        console.log(value)
        if(ref.current)
        ref.current.focus();
    }, []);
    function sendMessageToUser(val){
        sendMessage({
            to: receiverObj?.username,
            message: val,
            from: username,
            chatId: connection.activeChatId
        })
    }
    function handleClick(e){
        e.preventDefault();
        const val = e.target.value;
        setValue('');
        dispatch(addNewMessage({
            _id:Math.random(),
            message:val,
            timeStamp:Date.now().toString(),
            status:'S',
            sender:username,
            receiver:receiverObj?.username,
            type:'text'
        }))
        sendMessageToUser(val)
    }
    function handleValueChange(e){
        setValue(e.target.value);
    }
    return (
            <div style={{display: 'flex', flex: 0.08, margin: 20}}>
                <Input
                    style={{height: "100%", fontSize: 20, flex: 0.99, margin: 2}}
                    placeholder='Start Typing....'
                    onPressEnter={handleClick}
                    value={value}
                    onChange={handleValueChange}
                    ref={ref}
                />
                <Button style={{
                    flex: 0.01,
                    height: "100%",
                    backgroundColor: '#7c7fd9',
                    borderRadius: 100,
                    marginLeft: 5
                }}
                        onClick={handleClick}
                >
                    <SendOutlined/>
                </Button>
            </div>
        // </div>
    )
}