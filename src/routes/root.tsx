import { useState } from "react";
import ButtonComp from "../components/Button";
import SignUpDetailsForm from "../components/SignUpDetailsForm"
import ModalComp from "../components/Modal";



export default function Root() {
 
  const [signUpModal,setSignUpModal] = useState(false);

  const handleSignUp = ()=>{
    setSignUpModal(true);

  }
  const handleCancelModal =()=>{
    setSignUpModal(false);
    console.log("I am cancelled")
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
    />
  
    <ModalComp open={signUpModal} 
      okButtonProps={{style:{display:'none'}}}
      cancelButtonProps={{ style: { display: 'none' } }}
      >
        <SignUpDetailsForm onFinish={(val:any)=>console.log(val)} handleCancel={handleCancelModal}/>

    </ModalComp>
   </div>
  )
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "white",
  alignContent:'space-evenly'
};