import {Button, Form, Input} from "antd";
import {CheckUserNameAvailable} from "../../utils/handleSignUp";
import debounce from "lodash/debounce";
import {useState} from "react";

const usernameStatus = {
    AVAILABLE:1,
    BLANK:0,
    UN_AVAILABLE:2
}

export default function SignUpComponent({openSignIn,signUp}){
    const { AVAILABLE, BLANK, UN_AVAILABLE} = usernameStatus;


    const [isUsernameAvailable,setUsernameAvailable] = useState(BLANK);
    async function checkUsername(value){
        if(!value){
            setUsernameAvailable(BLANK);
            return;
        }
        const res = await CheckUserNameAvailable(value);
        setUsernameAvailable(() => res ? AVAILABLE : UN_AVAILABLE);
    }
   const debouncedCheckUsername = debounce(checkUsername,300);

    const validateStatus = isUsernameAvailable === AVAILABLE ? 'success' :
        isUsernameAvailable === UN_AVAILABLE ? 'error' : null;
    const help = validateStatus === 'error' ? 'Username is not available' :'';
    const hasFeedback = isUsernameAvailable !== BLANK ;
    return(
        <>
            <h2>Sign Up</h2>
            <Form name='signUp' onFinish={signUp} layout='vertical'>
                <Form.Item name='username' label="Username"
                           rules={[
                    {
                        required:true,
                        message:'Username is mandatory to Login'
                    }
                ]}
                           validateStatus={validateStatus}
                           help={help}
                           hasFeedback={hasFeedback}
                >
                    <Input
                        onChange ={(e) => debouncedCheckUsername(e.target.value)}
                        autoFocus
                    />
                </Form.Item>
                <Form.Item name='name' label='Name' rules={[
                    {
                        required:true,
                        message:'Name is mandatory to Login'
                    },

                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='email' label='Email' rules={[
                    {
                        type:'email',
                        message:'Enter a valid email id'
                    },{
                        required:true,
                        message:'Email is mandatory to Login'
                    }

                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='mobile' label='Mobile' rules={[
                    {
                        pattern: /^[0-9]{10}$/,
                        message: "Mobile Number must be exactly 10 digits",
                    },{
                        required:true,
                        message:'Mobile Number is mandatory to Login'
                    }

                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = 'Password'
                    name='password'
                    rules={[
                        {
                            required:true,
                            message:'Password is mandatory to Sign up'
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' name='submit' htmlType='submit' disabled={isUsernameAvailable !== AVAILABLE}>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <Button type='link' onClick={openSignIn} >
                Sign In
            </Button>
        </>

    )
}