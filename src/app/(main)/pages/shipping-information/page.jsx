// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ShippingInformation from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Shipping Information',
  link: 'pages/shipping-information'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ShippingInformationPage
// ==================

const ShippingInformationPage = async () => {
  return <ShippingInformation />;
};

export { metadata, schemadata };
export default ShippingInformationPage;
