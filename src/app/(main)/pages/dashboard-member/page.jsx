// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DashboardMember from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Dashboard Member',
  link: 'pages/dashboard-member'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DashboardMemberPage
// ==================

const DashboardMemberPage = async () => {
  return <DashboardMember />;
};

export { metadata, schemadata };
export default DashboardMemberPage;
