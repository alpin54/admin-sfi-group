// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Category from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Category',
  link: 'product/category'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CategoryPage
// ==================

const CategoryPage = async () => {
  return <Category />;
};

export { metadata, schemadata };
export default CategoryPage;
