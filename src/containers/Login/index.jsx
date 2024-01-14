import React from "react";
import {useState} from "react";
import SignInComponent from "./SignInComponent.jsx";
import SignUpComponent from "./SignUpComponent.jsx";
import {ItemWrapper, LoginContainer} from "./styles.js";
import {SignIN} from "../../utils/handleSignIn";
import {useDispatch, useSelector} from "react-redux";
import {setAuthData} from "../../slices/authSlice.js";
import {SignUp} from "../../utils/handleSignUp";
import {getIsLoggedIn} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const SIGNIN='signIn';
const SIGNUP ='signup'

export default function Login(){
    const navigate =  useNavigate();
    const [formMode,setFormMode] = useState(SIGNIN);
    const dispatch = useDispatch();

    function changeFormMode(){
        setFormMode(prevState => prevState === SIGNUP ? SIGNIN : SIGNUP);
    }
    async function signIn(value){
        const apiResponse = await SignIN(value);
        if(apiResponse.data) {
            dispatch(setAuthData(apiResponse.data));
            navigate('/homepage')
        }
    }
    async function signUp(value){
       await SignUp(value);
       const {username , password} = value;
        await signIn({
            username, password
        })
    }


    return (<ItemWrapper>
            <LoginContainer>
                {formMode === SIGNIN ?
                    <SignInComponent signIn={signIn} openSignUp={changeFormMode}/> :
                    <SignUpComponent signUp={signUp} openSignIn={changeFormMode}/>
                }
            </LoginContainer>

    </ItemWrapper>
    )
}