import {SearchOutlined} from "@ant-design/icons";
import {useContext, useState} from "react";
import {Button, Input, message} from "antd";
import {CheckUserNameAvailable} from "../../utils/handleSignUp";
import {constants} from "../../utils/Constants";
import {useSelector} from "react-redux";
import {SocketContext} from "../../utils/utils";

export default function SearchUser(){
    const [expandSearch,setExpandSearch] = useState(false);
    const {username} = useSelector(state => state.auth);
    const [searchText ,setSearchText]= useState('');
    const btnType = searchText ? 'Send' :'Close';
    const {sendConnectionRequestNotifs} = useContext(SocketContext);

    async function handleButtonClick(){
        if(btnType === 'Send'){
            console.log('Sending');
            await sendFriendRequest();
        }
        else {
            setExpandSearch(false);
        }
    }

    async function sendFriendRequest(){
        if (searchText) {
            const res = await CheckUserNameAvailable(searchText);  // if the username is valid then only I will send the request
            if (res) {
                message.error("No Username available");

            } else {
                sendConnectionRequestNotifs({
                    destinatedUsername: searchText,
                    originatedFromUsername: username,
                    type: constants.REQUEST_TYPE
                });
                message.success('Sent Successfully');
            }
            setSearchText("");
        }
    }

    return (<>
            {
                !expandSearch ? <SearchOutlined style={{fontSize: '25px', color: "black"}} onClick={()=>setExpandSearch(!expandSearch)}/>
                    : <>
                        <Button type='primary' style={{height:50,marginRight:10,marginLeft:10}} onClick={handleButtonClick}>{btnType}</Button>
                        <Input
                            size='large'
                            variant='filled'
                            style={{display:'flex',flex:1,height:50,backgroundColor:'white',opacity:0.5}}
                            placeholder='Enter Username'
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            onPressEnter={handleButtonClick}
                        />

                    </>

            }
        </>

    )
}