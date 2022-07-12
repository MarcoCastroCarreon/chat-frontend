import type { RegisterFormValues } from 'pages/types/_app';
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Spin,
  Typography,
} from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import fetcher from 'utils/fetcher';

const { Item, useForm } = Form;
const { Password } = Input;
const { Title } = Typography;

export default function App() {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const validatePasswords = (
    password: string | undefined,
    confirmPassword: string | undefined
  ) => {
    return password === confirmPassword;
  };

  const onFinish = (values: RegisterFormValues) => {
    if (!validatePasswords(values.password, values.confirmPassword)) {
      notification.error({
        message: 'Passwords are not the same',
        duration: 3,
      });
      return;
    }

    setLoading(true);
    fetcher('/api/users', 'POST', values)
      .then(() => {
        notification.success({
          message: 'Registered successfully!',
          duration: 2,
        });
      })
      .catch(error => {
        notification.error({
          message: 'Something went wrong, try again later',
          duration: 2,
        });
        console.error('Failed to make the request', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<RegisterFormValues>) =>
    notification.error({
      message: 'Check the following fields in form',
      duration: 3,
      description: errorInfo.errorFields.reduce(
        (previousValue, currentValue) => {
          return `${previousValue} ${currentValue.name[0]}`;
        },
        ''
      ),
    });

  return (
    <div className={styles['home_container']}>
      <Head>
        <title>Chat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Spin spinning={loading} tip="Submitting...">
        <Row className={styles['home_container-form_container_row']}>
          <Col xs={2} md={5} lg={4} />
          <Col xs={20} md={12} lg={12}>
            <Title level={2}>Register User</Title>
            <Form
              name="basic"
              form={form}
              labelCol={{ span: 7 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{}}
            >
              <Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Password />
              </Item>

              <Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password again!',
                  },
                ]}
              >
                <Password />
              </Item>

              <Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Item>
            </Form>
          </Col>
          <Col xs={2} md={2} lg={2} />
        </Row>
      </Spin>
    </div>
  );
}
