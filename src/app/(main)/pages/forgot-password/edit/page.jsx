// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ForgotPasswordEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Forgot Password',
  link: 'pages/forgot-password/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ForgotPasswordEditPage
// ==================

const ForgotPasswordEditPage = async () => {
  return <ForgotPasswordEdit />;
};

export { metadata, schemadata };
export default ForgotPasswordEditPage;
