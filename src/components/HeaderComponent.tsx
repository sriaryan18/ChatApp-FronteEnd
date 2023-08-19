import { Avatar, Badge, Dropdown, Image, MenuProps } from "antd";
import DP from '../assets/Aryan.jpg';  // to be imported based on user profile
import { BellOutlined, MoreOutlined } from "@ant-design/icons";

export default function  HeaderComponent({username,notifications}:any){
    console.log("I am count",notifications.length);
      const items: MenuProps['items']=notifications.map((item:any,index:number)=>{
            return {
                label:<a>
                    <span style={{fontFamily:'cursive',color:'green', margin:10}}>
                        {item?.['from' as keyof object]}
                    </span> 
                        Wants to connect
                    </a>,
                key:index
            }
      })
      console.log("I am notificationitems",items);
    return(
        <div style={{display:'flex',flex:1,justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center',}}> 
                    <Image src={DP}
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
                <Dropdown trigger={['click']} menu={{items}} disabled={notifications.length !== 0?false:true}>
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