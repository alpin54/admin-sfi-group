// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SuccessCreateAccount from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Succes Create Account',
  link: 'pages/success-create-account'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SuccessCreateAccountPage
// ==================

const SuccessCreateAccountPage = async () => {
  return <SuccessCreateAccount />;
};

export { metadata, schemadata };
export default SuccessCreateAccountPage;
