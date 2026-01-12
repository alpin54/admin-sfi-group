// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Pages from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Pages',
  link: 'pages'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// PagesPage
// ==================

const PagesPage = async () => {
  return <Pages />;
};

export { metadata, schemadata };
export default PagesPage;
