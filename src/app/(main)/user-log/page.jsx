// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import UserLog from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'User Log',
  link: 'user-log'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// UserLogPage
// ==================

const UserLogPage = async () => {
  return <UserLog />;
};

export { metadata, schemadata };
export default UserLogPage;
