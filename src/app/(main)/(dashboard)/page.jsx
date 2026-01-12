// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Dashboard from './modules';

// -- metadata
const metadata = metaTag.dynamic();

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DashboardPage
// ==================

const DashboardPage = async () => {
  return <Dashboard />;
};

export { metadata, schemadata };
export default DashboardPage;
