// -- libraries
import { Layout } from 'antd';

// -- components
import AuthGuard from '@components/AuthGuard';
import ContentLayout from '@components/ContentLayout';
import SidebarWidget from '@components/Sidebar/widgets/Default';
import HeaderWidget from '@components/Header/widgets/Default';

const MainLayout = ({ children }) => {
  return (
    <AuthGuard>
      <Layout style={{ minHeight: '100vh' }}>
        <SidebarWidget />
        <Layout style={{ margin: '16px 16px 16px 0', borderRadius: 12, overflow: 'hidden' }}>
          <HeaderWidget />
          <ContentLayout>{children}</ContentLayout>
        </Layout>
      </Layout>
    </AuthGuard>
  );
};

export default MainLayout;
