import { Avatar, Badge, Dropdown, Image, MenuProps } from "antd";
import { BellOutlined, MoreOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import ModalComp from "./Modal";
import NotificationExpanded from "./NotificationExpanded";
import { sendConnectionRequestNotifs } from "../Sockets/SendMessages";
import { AddOrDeleteConnection } from "../utils/connections";
import { constants } from "../utils/Constants";

export default function  HeaderComponent({username,notifications,deleteNotification}:any){

    const appContext:any = useContext(AppContext);
    const [showNotificationModal,setShowNotificationModal] = useState(false);
    const [currentIndex,setCurrentIndex]  = useState<number | null>(null);  
    const [notificationItems,setNotificationItems] = useState<any>([]);
    const socket  = appContext.state.socket;
    const token = appContext.state.authToken;
    useEffect(()=>{
        const items: MenuProps['items']=notifications.map((item:any,index:number)=>{
            return {
                label:<a onClick={()=>{handleClickOnNotificationItem(index,item);}}>
                    <span style={{fontFamily:'cursive',color:'green', margin:10}}>
                        {item?.['originatedFromUsername' as keyof object]}
                    </span> 
                        {item?.["type" as keyof object] === "request"?"Wants to connect":"Accepted You Invite!!"}
                    </a>,
                key:index
            }
      });
      setNotificationItems({items});

    },[notifications]);

    const deleteAcceptRequestNotification = async (username:string,originatedFromUsername:string)=>{
        const res = await AddOrDeleteConnection(token,originatedFromUsername,username,constants.ACCEPT_TYPE);
        if(res.status === 200){
            console.log("I am response of add or delete ",username);   
            deleteNotification(originatedFromUsername,constants.ACCEPT_TYPE);
        }

    }

    const handleClickOnNotificationItem = async  (index:number,item:any)=>{
        setShowNotificationModal(true);
        setCurrentIndex(index);
        if(item?.["type" as keyof object]==constants.ACCEPT_TYPE){
            setShowNotificationModal(false);
            await deleteAcceptRequestNotification(username,item?.['originatedFromUsername' as keyof object]);
    }}

    const acceptRequest = async (destinatedUsername:string,type:string)=>{
        const msg = {
            destinatedUsername,
            originatedFromUsername:username,
            type:constants.ACCEPT_TYPE
            }
        if(type === 'request')
            sendConnectionRequestNotifs(socket,msg);
        setShowNotificationModal(false); 

        const res = await AddOrDeleteConnection(token,destinatedUsername,username,constants.REQUEST_TYPE);
        if(res.status === 200){
            console.log("I am response of add or delete ",destinatedUsername);   
            deleteNotification(destinatedUsername,type);
        }
    }

    const rejectRequest  = ()=>{
        console.log("I am rejected");
        setShowNotificationModal(false);
    }     
    return(
        <div style={{display:'flex',flex:1,justifyContent:'space-between'}}>
            <ModalComp 
                visible ={showNotificationModal}  
                onCancel = {()=>setShowNotificationModal(false)}
                okButtonProps={{style:{display:'none'}}}
                cancelButtonProps={{ style: { display: 'none' } }}
                bodyStyle={{minHeight: 300}}    
                
            >
                {currentIndex !== null && notifications.length>0?<NotificationExpanded 
                    notification={notifications[currentIndex]}
                    accept={acceptRequest}
                    reject={rejectRequest}
                />:null }  
            </ModalComp>
            <div style={{display:'flex', alignItems:'center'}}> 
                    <Image src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random()}`} 
                    style={{ 
                        borderRadius:50, 
                        height:50,width:50, 
                        marginRight:20
                        
                        }} 
                    />
                    <h2 style={{color:'black', fontFamily:'cursive'}}>
                        {username}
                    </h2>
                    
            </div>
            <div  style={{alignSelf:'center',display: 'flex', alignItems: 'center' ,flexDirection:'row-reverse',flex:0.06,justifyContent:'space-between'}}>
                <MoreOutlined  style={{ fontSize: '35px', color: 'white',cursor:'pointer'}} 
                    onClick={()=>console.log( )}
                />
                <Dropdown trigger={['click']} menu={notificationItems} >
                  <a onClick={()=>console.log('ix')}>
                        <Badge count={notifications.length } 
                            offset={[10, 10]} 
                            style={{marginRight:10}}>
                            <Avatar size="large" icon={<BellOutlined />} />
                        </Badge>
                    </a>
                </Dropdown>
            </div>
        </div>
    
    );
}