// -- utils
import metaTag from '@utils/metaTag';

// -- modules
import SignIn from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Sign In',
  link: 'sign-in'
});

const SignInPage = () => {
  return <SignIn />;
};

export { metadata };
export default SignInPage;
