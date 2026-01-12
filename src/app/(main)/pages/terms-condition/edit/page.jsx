// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import TermsConditionEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Terms Condition',
  link: 'pages/terms-condition/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// TermsConditionEditPage
// ==================

const TermsConditionEditPage = async () => {
  return <TermsConditionEdit />;
};

export { metadata, schemadata };
export default TermsConditionEditPage;
