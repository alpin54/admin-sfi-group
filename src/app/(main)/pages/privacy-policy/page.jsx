// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import PrivacyPolicy from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Privacy Policy',
  link: 'pages/privacy-policy'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// PrivacyPolicyPage
// ==================

const PrivacyPolicyPage = async () => {
  return <PrivacyPolicy />;
};

export { metadata, schemadata };
export default PrivacyPolicyPage;
