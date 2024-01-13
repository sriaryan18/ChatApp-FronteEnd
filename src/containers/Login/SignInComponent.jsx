import {Button, Form, Input} from "antd";

export default  function SignInComponent({signIn,openSignUp}){


    return (
        <>
            <Form name = 'signinForm' onFinish={signIn} layout='vertical'>
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[
                        {
                            required:true,
                            message:'Username is mandatory to Login'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = 'Password'
                    name='password'
                    rules={[
                        {
                            required:true,
                            message:'Password is mandatory to Login'
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' name='submit' htmlType='submit'>
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
            <Button type='link' onClick={openSignUp}>
                Sign Up
            </Button>
        </>

    )

}