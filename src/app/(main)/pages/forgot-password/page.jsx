// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ForgotPassword from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Forgot Password',
  link: 'pages/forgot-password'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ForgotPasswordPage
// ==================

const ForgotPasswordPage = async () => {
  return <ForgotPassword />;
};

export { metadata, schemadata };
export default ForgotPasswordPage;
