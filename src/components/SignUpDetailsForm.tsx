import { Button, Form, Input } from 'antd'

export default function SignUpDetailsForm({onFinish,handleCancel}:any) {
  const [form]=Form.useForm();
  return (
    <Form onFinish={onFinish} form={form}>
       <Form.Item style={{marginRight:10,width:"90%"}}
        rules={[
          { required: true, message: "Please input Username" },
        ]}
        label="Username" name="username"
      >
        <Input
          placeholder='Enter Username'
        />
      </Form.Item>
      <Form.Item name="fullName" label="Full Name" 
        style={{width:"90%"}} 
        rules={[{ required: true, message: 'Please input Full Name' }]}
      >
        <Input placeholder='Full Name'/>
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
          { required: true, message: "Please input Password" },
        ]}
        label="Password" name="password"
      >
        <Input
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
