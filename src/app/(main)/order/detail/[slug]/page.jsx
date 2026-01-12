// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import OrderDetail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Order',
  link: 'order/detail/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// OrderDetailPage
// ==================

const OrderDetailPage = async () => {
  return <OrderDetail />;
};

export { metadata, schemadata };
export default OrderDetailPage;
