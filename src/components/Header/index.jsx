import ModalComp from "../Modal";
import {Avatar, Badge, Dropdown, Image} from "antd";
import {BellOutlined, MoreOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useState} from "react";
import SearchUser from "./SearchUser.jsx";
import {StyledSearchUser} from "./styles.js";
import Notifications from "./Notifications.jsx";

export default function HeaderComponent(){
    const {username} = useSelector(state => state.auth);
    const {notifications} = useSelector(state => state.auth);
    const [showNotificationModal,setShowNotificationModal] = useState(false);


    return (
        <div style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Image src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random()}`}
                       style={{
                           borderRadius: 50,
                           height: 50, width: 50,
                           marginRight: 20

                       }}
                />
                <h2 style={{color: 'black', fontFamily: 'cursive'}}>
                    {username}
                </h2>

            </div>
            <div style={{
                alignSelf: 'center',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                flex: 0.5,
            }}>
                <MoreOutlined style={{fontSize: '35px', color: 'white', cursor: 'pointer'}}
                              onClick={() => console.log()}
                />
                <Notifications/>
                <StyledSearchUser/>
            </div>
        </div>
    )
}