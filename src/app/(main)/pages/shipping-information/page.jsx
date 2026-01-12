// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ShippingReturn from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Shipping Information',
  link: 'pages/shipping-information'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ShippingReturnPage
// ==================

const ShippingReturnPage = async () => {
  return <ShippingReturn />;
};

export { metadata, schemadata };
export default ShippingReturnPage;
