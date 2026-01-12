'use client';

// -- libraries
import { Layout, theme } from 'antd';

const ContentLayout = ({ children }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const { Content } = Layout;

  return (
    <Content
      style={{
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        color: '#525252'
      }}>
      {children}
    </Content>
  );
};

export default ContentLayout;
