// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Favorite from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Favorite',
  link: 'pages/favorite'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// FavoritePage
// ==================

const FavoritePage = async () => {
  return <Favorite />;
};

export { metadata, schemadata };
export default FavoritePage;
