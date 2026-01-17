// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import TermsConditionsEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Terms Conditions',
  link: 'pages/terms-condition/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// TermsConditionsEditPage
// ==================

const TermsConditionsEditPage = async () => {
  return <TermsConditionsEdit />;
};

export { metadata, schemadata };
export default TermsConditionsEditPage;
