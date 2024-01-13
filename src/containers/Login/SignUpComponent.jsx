import {Button, Form, Input} from "antd";

export default function SignUpComponent({openSignIn,signUp}){
    return(
        <>
            <Form name='signUp' onFinish={signUp} layout='vertical'>
                <Form.Item name='username' label="Username" rules={[
                    {
                        required:true,
                        message:'Username is mandatory to Login'
                    }
                ]} >
                    <Input/>
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
                    <Button type='primary' name='submit' htmlType='submit'>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <Button type='link' onClick={openSignIn}>
                Sign In
            </Button>
        </>

    )
}