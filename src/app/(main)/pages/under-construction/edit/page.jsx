// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import UnderConstructionEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Under Construction',
  link: 'pages/under-construction/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// UnderConstructionEditPage
// ==================

const UnderConstructionEditPage = async () => {
  return <UnderConstructionEdit />;
};

export { metadata, schemadata };
export default UnderConstructionEditPage;
