// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SignUpEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Sign Up',
  link: 'pages/sign-up/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SignUpEditPage
// ==================

const SignUpEditPage = async () => {
  return <SignUpEdit />;
};

export { metadata, schemadata };
export default SignUpEditPage;
