'use client';

// -- libraries
import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
const { Content } = Layout;

// -- elements
import Empty from '@elements/Empty/views';

const AuthLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile)
    return (
      <Empty
        icon={<WarningOutlined />}
        title='Not Supported on Mobile'
        description='Oops! This platform works best on a desktop or laptop. For the best experience, please access it using a computer.'
      />
    );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          minHeight: 280,
          background: colorBgContainer,
          color: '#525252'
        }}>
        {children}
      </Content>
    </Layout>
  );
};

export default AuthLayout;
