// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SignInEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Sign in',
  link: 'pages/sign-in/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SignInEditPage
// ==================

const SignInEditPage = async () => {
  return <SignInEdit />;
};

export { metadata, schemadata };
export default SignInEditPage;
