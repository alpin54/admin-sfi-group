// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import NotFound from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Not Found',
  link: 'pages/not-found'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// NotFoundPage
// ==================

const NotFoundPage = async () => {
  return <NotFound />;
};

export { metadata, schemadata };
export default NotFoundPage;
