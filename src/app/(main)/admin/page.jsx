// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Admin from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Admin',
  link: 'admin'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AdminPage
// ==================

const AdminPage = async () => {
  return <Admin />;
};

export { metadata, schemadata };
export default AdminPage;
