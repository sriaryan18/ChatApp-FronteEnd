import ModalComp from "../Modal";
import {Avatar, Badge, Dropdown, Image} from "antd";
import {BellOutlined, MoreOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useState} from "react";

export default function HeaderComponent(){
    const {username} = useSelector(state => state.auth);
    const [showNotificationModal,setShowNotificationModal] = useState(false);
    return (
        <div style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
            <ModalComp
                visible={showNotificationModal}
                onCancel={() => setShowNotificationModal(false)}
                okButtonProps={{style: {display: 'none'}}}
                cancelButtonProps={{style: {display: 'none'}}}
                bodyStyle={{minHeight: 300}}

            >
                {/*{currentIndex !== null && notifications.length > 0 ? <NotificationExpanded*/}
                {/*    notification={notifications[currentIndex]}*/}
                {/*    accept={acceptRequest}*/}
                {/*    reject={rejectRequest}*/}
                {/*/> : null}*/}
            </ModalComp>
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
                flex: 0.06,
                justifyContent: 'space-between'
            }}>
                <MoreOutlined style={{fontSize: '35px', color: 'white', cursor: 'pointer'}}
                              onClick={() => console.log()}
                />
                <Dropdown trigger={['click']} menu={[]}>
                    <a onClick={() => console.log('ix')}>
                        <Badge count={1}
                               offset={[10, 10]}
                               style={{marginRight: 10}}>
                            <Avatar size="large" icon={<BellOutlined/>}/>
                        </Badge>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}