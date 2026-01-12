// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ShippingReturnEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Shipping Information',
  link: 'pages/shipping-return/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ShippingReturnEditPage
// ==================

const ShippingReturnEditPage = async () => {
  return <ShippingReturnEdit />;
};

export { metadata, schemadata };
export default ShippingReturnEditPage;
