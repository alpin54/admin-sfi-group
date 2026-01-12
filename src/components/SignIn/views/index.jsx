'use client';

// -- libraries
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Row, Button, Form, Input } from 'antd';
import Image from 'next/image';

// -- assets
import LogoImage from '@assets/image/logo/logo-primary.png';
import BackgroundImage from '@assets/image/dummy/signin-bg.jpg';

// -- styles
import style from '@components/SignIn/styles/style.module.scss';

// -- hooks
import useNotification from '@hooks/useNotification';

const SignInView = (props) => {
  const { onSubmit, loading, message } = props; // use 'message' to be consistent with the widget
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [formSignIn] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Login Failed',
        description: message
      });

      formSignIn.setFields([
        {
          name: 'email',
          errors: [message]
        },
        {
          name: 'password',
          errors: [message]
        }
      ]);
    }
  }, [message, notify, formSignIn]);

  const handleFinish = async (values) => {
    try {
      const response = await onSubmit(values);

      if (response) {
        notify({
          type: 'success',
          message: 'Login successfully',
          description: 'You will be redirected shortly.',
          duration: 2,
          onClose: () => {
            formSignIn?.resetFields();
            router.push('/');
          }
        });
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Login Failed',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <>
      {/* Show error if exists */}
      {notificationHolder}
      <section className={style.signin}>
        <Row className={style.wrapper}>
          {/* Left Section - Form */}
          <Col md={24} xl={12} className={style.form}>
            <div className={style.formWrapper}>
              <div className={style.formHead}>
                <div className={style.formLogo}>
                  <Image
                    className={style.formLogoImg}
                    src={LogoImage}
                    alt='Musee Platinum Tokyo'
                    width={144}
                    height={64}
                  />
                </div>
                <h3 className={style.title}>Hello 👋</h3>
                <p className={style.desc}>
                  Welcome Back to the <br />
                  Content Management System
                </p>
              </div>
              <Form
                form={formSignIn}
                name='signin-form'
                layout='vertical'
                onFinish={handleFinish}
                autoComplete='off'
                className={style.formBody}>
                <Form.Item
                  label='Email'
                  name='email'
                  validateFirst
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    }
                  ]}>
                  <Input allowClear />
                </Form.Item>

                <Form.Item
                  label='Password'
                  name='password'
                  validateFirst
                  rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.Password allowClear />
                </Form.Item>

                <Form.Item style={{ paddingTop: 16, marginBottom: 0 }}>
                  <Button type='primary' htmlType='submit' block loading={loading}>
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col xs={0} xl={12} className={style.image}>
            <Image src={BackgroundImage} alt='Image Sign In' width={684} height={912} />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default SignInView;
