import { useContext, useState } from "react";
import ButtonComp from "../components/Button";
import SignUpDetailsForm from "../components/SignUpDetailsForm"
import ModalComp from "../components/Modal";
import {CheckUserNameAvailable, SignUp} from '../utils/handleSignUp' ;
import SignInForm from "../components/SignInForm";
import { SignIN } from "../utils/handleSignIn";
import {  useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import {  triggerSockts } from "../utils/SendSocketMessage";
import { stringify } from 'flatted';



export default function Root() {
  
  const navigate = useNavigate();
  const [signUpModal,setSignUpModal] = useState(false);
  const [signInModal,setSignInModal] = useState(false);
  
  const contextProvider:any = useContext(AppContext);

  const handleSignUp = ()=>{
    setSignUpModal(true);

  }
  const handleCancelModalSignUp =()=>{
    setSignUpModal(false);
   
  }
  const handleSignInClick = ()=>{
    setSignInModal(true);
  }
  const handleCancelModalSignIN = ()=>{
    setSignInModal(false);
  }

  const handleSignIn = async (value:any) =>{
    const apiResponse:any = await SignIN(value);
    setSignInModal(false);
    if(apiResponse?.data){
        contextProvider?.dispatch({
          type:'LOGIN',
          payload:{
            'token':apiResponse.data.token,
            'userInfo':{...apiResponse.data.userInfo},
          
            }
        }
        );
      }
    sessionStorage.setItem('userInfo', stringify({...apiResponse?.data}));

    const onlineResponse = await triggerSockts(apiResponse.data.token,value.username);
      console.log("I am onlineResponse",onlineResponse)
      contextProvider?.dispatch({
        type:"ONLINE",
        payload:{...onlineResponse}
      });
    console.log(onlineResponse.socket)
    sessionStorage.setItem('socket' , stringify(onlineResponse));
    navigate('/homepage');
  }

   

  return (
  <div style={containerStyle}>
    
    <ButtonComp type="primary"
     label="Sign Up" 
     styles={{margin:50, background:'green'}} 
      onClick={handleSignUp}
    />
    <ButtonComp type="primary" 
      label="Sign In" 
      styles={{color:'black', borderColor:'Blue', background:'white' , borderWidth:2}}
      onClick={handleSignInClick}
    />
  
    <ModalComp open={signUpModal} 
      okButtonProps={{style:{display:'none'}}}
      cancelButtonProps={{ style: { display: 'none' } }}
      width={800} destroyOnClose
      >
        <SignUpDetailsForm
            onFinish={(val:any)=>{SignUp(val);setSignUpModal(false);}} 
            handleCancel={handleCancelModalSignUp}
            checkUserName = { CheckUserNameAvailable}
         />

    </ModalComp>
    {/**sign in modal */}
     <ModalComp open={signInModal} 
      okButtonProps={{style:{display:'none'}}}
      cancelButtonProps={{ style: { display: 'none' } }}
      
      >
        <SignInForm
            onFinish={
              handleSignIn}
            handleCancel={handleCancelModalSignIN}
            destroyOnClose
           
         />

    </ModalComp>
    
   </div>
  )
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "white",
  alignContent:'space-evenly'
};