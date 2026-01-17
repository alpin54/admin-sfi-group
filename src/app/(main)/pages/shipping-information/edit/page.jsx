// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ShippingInformationnEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Shipping Information',
  link: 'pages/shipping-information/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ShippingInformationnEditPage
// ==================

const ShippingInformationnEditPage = async () => {
  return <ShippingInformationnEdit />;
};

export { metadata, schemadata };
export default ShippingInformationnEditPage;
