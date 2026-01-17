// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import TermsConditions from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Terms Conditions',
  link: 'pages/terms-condition'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// TermsConditionsPage
// ==================

const TermsConditionsPage = async () => {
  return <TermsConditions />;
};

export { metadata, schemadata };
export default TermsConditionsPage;
