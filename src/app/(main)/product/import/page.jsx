// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Import from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Import Product',
  link: 'product/import'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ImportPage
// ==================

const ImportPage = async () => {
  return <Import />;
};

export { metadata, schemadata };
export default ImportPage;
