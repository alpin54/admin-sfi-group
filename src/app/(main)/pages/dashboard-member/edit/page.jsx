// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DashboardEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Dashboard Member',
  link: 'pages/dashboard-member/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DashboardEditPage
// ==================

const DashboardEditPage = async () => {
  return <DashboardEdit />;
};

export { metadata, schemadata };
export default DashboardEditPage;
