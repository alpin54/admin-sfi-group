// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import EmailForgotPasswordEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Send Email Forgot Password',
  link: 'pages/email-forgot-password/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// EmailForgotPasswordEditPage
// ==================

const EmailForgotPasswordEditPage = async () => {
  return <EmailForgotPasswordEdit />;
};

export { metadata, schemadata };
export default EmailForgotPasswordEditPage;
