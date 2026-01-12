// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import FavoriteEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Favorite',
  link: 'pages/favorite/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// FavoriteEditPage
// ==================

const FavoriteEditPage = async () => {
  return <FavoriteEdit />;
};

export { metadata, schemadata };
export default FavoriteEditPage;
