// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SignUp from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Sign Up',
  link: 'pages/sign-up'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SignUpPage
// ==================

const SignUpPage = async () => {
  return <SignUp />;
};

export { metadata, schemadata };
export default SignUpPage;
