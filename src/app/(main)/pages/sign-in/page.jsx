// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SignIn from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Sign in',
  link: 'pages/sign-in'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SignInPage
// ==================

const SignInPage = async () => {
  return <SignIn />;
};

export { metadata, schemadata };
export default SignInPage;
