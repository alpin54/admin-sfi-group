// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SuccessCreateAccountEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Success Create Account',
  link: 'pages/success-create-account/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SuccessCreateAccountEditPage
// ==================

const SuccessCreateAccountEditPage = async () => {
  return <SuccessCreateAccountEdit />;
};

export { metadata, schemadata };
export default SuccessCreateAccountEditPage;
