// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Cart from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Cart',
  link: 'pages/cart'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CartPage
// ==================

const CartPage = async () => {
  return <Cart />;
};

export { metadata, schemadata };
export default CartPage;
