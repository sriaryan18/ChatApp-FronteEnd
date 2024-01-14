import { Button, Form, Input } from 'antd';
import debounce from 'lodash/debounce';

import {  CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useState } from 'react';



export default function SignUpDetailsForm({onFinish,handleCancel,checkUserName}:any) {

  const [availableUsername,setAvailableUsername] = useState(null); 
  const [form]=Form.useForm();
  const debouncedCheckUsername = debounce(async (val)=>{
    const res = await checkUserName(val.target.value);
    setAvailableUsername(res);
  },1000)
  
  const availableUsernameIcon = <CheckCircleTwoTone  />
  const notAvailableUsernameIcon = <CloseCircleTwoTone />

  return (
    <Form onFinish={(formData)=>{onFinish(formData);form.resetFields();}} form={form}>
       <Form.Item style={{marginRight:10,width:"90%"}}
        rules={[
          { required: !availableUsername, message: "Please input Username" },
          
        ]}
        label="Username" name="username"
     
      >
        <Input
          placeholder='Enter Username' 
          onChange={debouncedCheckUsername}
          suffix={availableUsername?availableUsernameIcon:availableUsername===false?notAvailableUsernameIcon:null}
          

        />
      </Form.Item>
      <Form.Item name="fullName" label="Full Name" 
        style={{width:"90%"}} 
        rules={[{ required: true, message: 'Please input Full Name' }]}
      >
        <Input placeholder='Full Name' />
      </Form.Item>
      <Form.Item name="mobileNumber" 
        label="Mobile Number" 
        style={{marginRight:10,width:"90%"}}
        rules={[
          { required: true, message: "Please input Mobile Number" },
          {
            pattern: /^[0-9]{10}$/, 
            message: "Mobile Number must be exactly 10 digits",
          },
        ]}
      >
          <Input placeholder='Mobile Number' maxLength={10} minLength={10} type='number'/>
      </Form.Item>
       <Form.Item style={{marginRight:10,width:"90%"}}
        rules={[
          { required: true, message: "Please input Email" },
        ]}
        label="Email" name="email"
      >
        <Input
          placeholder='Enter email' type='email'
        />
      </Form.Item>
      <Form.Item style={{marginRight:10,width:"90%"}}
        rules={[
          { required: true, message: "Please input Password" },
        ]}
        label="Password" name="password"
      >
        <Input.Password
          placeholder='Enter password' type='password' 
        />
      </Form.Item>
     
      <Form.Item>
        <Button htmlType='submit' type='primary'>
          Submit
        </Button>
        <Button onClick={()=>{form.resetFields();handleCancel();}} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>

      
    </Form>
  )
}
