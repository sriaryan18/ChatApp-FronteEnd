import { Input,Form, Button } from 'antd'


export default function SignInForm({onFinish,handleCancel}:any) {
   const [form]=Form.useForm();
   return (
    <Form form={form} onFinish={(val)=>{onFinish(val);form.resetFields()}} >
        <Form.Item style={{marginRight:10,width:"90%"}}
            rules={[
            { required: true , message: "Please input Username" },
            
            ]}
            label="Username" name="username"
        >
            <Input
            placeholder='Enter Username' 
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
