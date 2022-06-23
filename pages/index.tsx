import type { NextPage } from 'next';
import { Button, Form, Input, notification, Spin } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';


const { Item, useForm } = Form;
const { Password } = Input;

type RegisterFormValues = { 
   username: string | undefined,
   password: string | undefined,
   confirmPassword: string | undefined
 }

const App: NextPage = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const validatePasswords = (password: string | undefined, confirmPassword: string | undefined) => {
    return password === confirmPassword;
  }

  const onFinish = (values: RegisterFormValues) => {
    console.log('Success:', values);
    if(!validatePasswords(values.password, values.confirmPassword)) {
      notification.error({
        message: 'Passwords are not the same',
        duration: 3,
      });
      return;
    }

    setLoading(true);
    setTimeout(() => { setLoading(false) }, 2000);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<RegisterFormValues>) => {
    console.log('Failed:', errorInfo);
    
    notification.error({
      message: 'Check the following fields in form',
      duration: 3,
      description: errorInfo.errorFields.reduce((previousValue, currentValue) => {
        return `${previousValue}, ${currentValue.name[0]}`
      }, '')
    })
  };

  return (
    <div className={styles['home_container']} >
      <Head>
        <title>Chat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Spin spinning={loading} tip='Submitting...' >
      <Form
      name="basic"
      form={form}
      labelCol={{ span: 9 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles['home_container']}
    >
      <Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Password />
      </Item>

      <Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: 'Please input your password again!' }]}
      >
        <Password />
      </Item>

      <Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
      </Spin>
    </div>
  );
};

export default App;