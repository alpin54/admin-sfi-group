// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import UnderConstruction from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Under Construction',
  link: 'pages/under-construction'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// UnderConstructionPage
// ==================

const UnderConstructionPage = async () => {
  return <UnderConstruction />;
};

export { metadata, schemadata };
export default UnderConstructionPage;
