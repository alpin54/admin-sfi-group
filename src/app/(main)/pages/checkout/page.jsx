// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Checkout from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Checkout',
  link: 'pages/checkout'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CheckoutPage
// ==================

const CheckoutPage = async () => {
  return <Checkout />;
};

export { metadata, schemadata };
export default CheckoutPage;
