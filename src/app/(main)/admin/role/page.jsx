// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Role from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Role',
  link: 'admin/role'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// RolePage
// ==================

const RolePage = async () => {
  return <Role />;
};

export { metadata, schemadata };
export default RolePage;
