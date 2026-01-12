// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import NewPassword from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'New Password',
  link: 'pages/new-password'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// NewPasswordPage
// ==================

const NewPasswordPage = async () => {
  return <NewPassword />;
};

export { metadata, schemadata };
export default NewPasswordPage;
