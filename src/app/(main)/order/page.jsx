// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Order from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Order',
  link: 'order'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// OrderPage
// ==================

const OrderPage = async () => {
  return <Order />;
};

export { metadata, schemadata };
export default OrderPage;
