// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Menu from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Menu',
  link: 'menu'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MenuPage
// ==================

const MenuPage = async () => {
  return <Menu />;
};

export { metadata, schemadata };
export default MenuPage;
