// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import TermsCondition from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Terms Condition',
  link: 'pages/terms-condition'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// TermsConditionPage
// ==================

const TermsConditionPage = async () => {
  return <TermsCondition />;
};

export { metadata, schemadata };
export default TermsConditionPage;
