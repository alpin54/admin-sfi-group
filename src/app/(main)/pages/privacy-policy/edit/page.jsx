// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import PrivacyPolicyEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Privacy Policy',
  link: 'pages/privacy-policy/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// PrivacyPolicyEditPage
// ==================

const PrivacyPolicyEditPage = async () => {
  return <PrivacyPolicyEdit />;
};

export { metadata, schemadata };
export default PrivacyPolicyEditPage;
