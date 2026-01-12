// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import CartEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Cart',
  link: 'pages/cart-member/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CartEditPage
// ==================

const CartEditPage = async () => {
  return <CartEdit />;
};

export { metadata, schemadata };
export default CartEditPage;
