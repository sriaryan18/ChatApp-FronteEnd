import { Avatar, Popconfirm } from "antd";
import ButtonComp from "./Button";

export default function NotificationExpanded({notification,accept,reject}:any){
    return (
        <div style={{display:'flex', flex:1, flexDirection:'column',justifyContent:'space-between' }}>
            <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>

                <h2>
                    <span style={{fontFamily:'cursive',color:'green', margin:10}}>{notification.from}</span>
                    {notification.type === 'accepted'?"accepted your request":"wants to connect"}
                    
                </h2>
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random()}`} 
                    size={200} 
                    style={{border:'2px solid black', margin:40}}
                />
            </div>
            {
                notification.type ==='accepted'?
                <>
                </>:
                <div style={{display:'flex', flex:0.1,justifyContent:'space-around'}}>
                    <ButtonComp 
                        type="primary" 
                        styles={{background:"#97f589"}} 
                        label="accept"
                        key={0} 
                        
                        onClick={accept}
                    />
                     <ButtonComp 
                        type="link" 
                        styles={{border:'2px solid #e31010'}} 
                        label="reject"
                        key={1} 
                        onClick={reject}
                    />
                </div>
            }
        </div>
    );
}