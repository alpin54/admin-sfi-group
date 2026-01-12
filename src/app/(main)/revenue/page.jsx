// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Revenue from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Revenue',
  link: 'revenue'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// RevenuePage
// ==================

const RevenuePage = async () => {
  return <Revenue />;
};

export { metadata, schemadata };
export default RevenuePage;
