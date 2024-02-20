import {Avatar, Badge, Dropdown} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {useContext, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ModalComp from "../Modal";
import NotificationExpanded from "../NotificationExpanded";
import {constants} from "../../utils/Constants";
import {deleteNotifications} from '../../slices/authSlice';
import {SocketContext} from "../../utils/utils";
import {AddOrDeleteConnection} from "../../utils/connections";
import {addNewConnection} from "../../slices/connectionSlice";

export default function Notifications(){
    const [notificationIdx,setNotificationIdx] = useState(null);
    const dispatch = useDispatch();
    const {notifications:{notificationsReceived},username,token} = useSelector(state => state.auth);
    const {sendConnectionRequestNotifs, deleteFriendRequest} = useContext(SocketContext);
    const menus= useMemo(()=>{
        return notificationsReceived.map((item, index) => {
            return {
                label:<a onClick={()=>{handleClickOnNotificationItem(index,item);}}>
                    <span style={{fontFamily:'cursive',color:'green', margin:10}}>
                        {item?.originatedFromUsername}
                    </span>
                    {item?.type === "request"?"Wants to connect":"Accepted You Invite!!"}
                </a>,
                key:index
            }
        });
    },[notificationsReceived]);

    function handleClickOnNotificationItem(index){
        setNotificationIdx(index);
    }
    const acceptRequest = async (destinatedUsername,type)=>{
        const msg = {
            destinatedUsername,
            originatedFromUsername:username,
            type:constants.ACCEPT_TYPE
        }
        if(type === 'request') sendConnectionRequestNotifs(msg);
        setNotificationIdx(null);

        const res =
            await AddOrDeleteConnection(token,destinatedUsername,username,constants.REQUEST_TYPE);
        if(res.status === 200){
            dispatch(deleteNotifications({username:destinatedUsername,type}, type));
            dispatch(addNewConnection({
                username:destinatedUsername,
                chatId:res.data
            }))
        }
    }
    function rejectRequest(data){
        const type = constants.REQUEST_TYPE;
        const {originatedFromUsername} = data;
        const payload = {
            originatedFromUsername,
            destinatedUsername: username,
        }
        deleteFriendRequest(payload);
        dispatch(deleteNotifications({username:originatedFromUsername,type}, type));
        setNotificationIdx(null);

    }
    function handleClose(){
        const {type, originatedFromUsername} = notificationsReceived[notificationIdx];
        if(type === constants.ACCEPT_TYPE){
            dispatch(deleteNotifications({username:originatedFromUsername,type}, type));
        }
        deleteFriendRequest({
            originatedFromUsername,
            destinatedUsername:username,
        })
        setNotificationIdx(null);
    }

    const showModal = notificationIdx !== null;
    return(
        <>
            <ModalComp
                visible ={showModal}
                onCancel = {handleClose}
                okButtonProps={{style:{display:'none'}}}
                cancelButtonProps={{ style: { display: 'none' } }}
                bodyStyle={{minHeight: 300}}

            >
                <NotificationExpanded
                    notification={notificationsReceived[notificationIdx]}
                    accept={acceptRequest}
                    reject={rejectRequest}
              />
            </ModalComp>
            <Dropdown trigger={['click']} menu={{items:menus}}>
                <div onClick={() => console.log('ix')} style={{marginRight:20,marginLeft:25,cursor:'pointer'}}>
                    <Badge count={menus.length}
                           offset={[10, 10]}
                           style={{marginRight: 10}}
                    >
                        <Avatar size="large" icon={<BellOutlined/>} onClick={()=>console.log('j')}/>
                    </Badge>
                </div>
            </Dropdown>
        </>

    )
}