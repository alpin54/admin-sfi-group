// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import EmailForgotPassword from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Send Email Forgot Password',
  link: 'pages/email-forgot-password'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// EmailForgotPasswordPage
// ==================

const EmailForgotPasswordPage = async () => {
  return <EmailForgotPassword />;
};

export { metadata, schemadata };
export default EmailForgotPasswordPage;
