import { Avatar, Badge, Dropdown, Image, MenuProps } from "antd";
import { BellOutlined, MoreOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import ModalComp from "./Modal";
import NotificationExpanded from "./NotificationExpanded";

export default function  HeaderComponent({username,notifications}:any){

    const appContext:any = useContext(AppContext);
    const [showNotificationModal,setShowNotificationModal] = useState(false);
     const [currentIndex,setCurrentIndex]  = useState<number | null>(null);  
     const [notificationItems,setNotificationItems] = useState<any>([]);
    useEffect(()=>{
        const items: MenuProps['items']=notifications.map((item:any,index:number)=>{
            return {
                label:<a onClick={()=>{setShowNotificationModal(true);setCurrentIndex(index)}}>
                    <span style={{fontFamily:'cursive',color:'green', margin:10}}>
                        {item?.['from' as keyof object]}
                    </span> 
                        Wants to connect
                    </a>,
                key:index
            }
      });
      setNotificationItems({items});

    },[notifications]);

    const acceptRequest = ()=>{
        console.log("I am accepted");
        setShowNotificationModal(false); 
    }

    const rejectRequest  = ()=>{
        console.log("I am rejected");
        setShowNotificationModal(false);
    }

    console.log("I am count",notifications.length);
     
      console.log("I am notificationitems",notifications,appContext);  
    return(
        <div style={{display:'flex',flex:1,justifyContent:'space-between'}}>
            <ModalComp 
                visible ={showNotificationModal}  
                onCancel = {()=>setShowNotificationModal(false)}
                okButtonProps={{style:{display:'none'}}}
                cancelButtonProps={{ style: { display: 'none' } }}
                bodyStyle={{minHeight: 300}}    
                
            >
                <NotificationExpanded 
                    notification={notifications[currentIndex?currentIndex:0]}
                    accept={acceptRequest}
                    reject={rejectRequest}
                />   
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