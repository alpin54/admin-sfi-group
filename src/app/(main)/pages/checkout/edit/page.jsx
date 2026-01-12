// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import CheckoutEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Checkout',
  link: 'pages/checkout/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CheckoutEditPage
// ==================

const CheckoutEditPage = async () => {
  return <CheckoutEdit />;
};

export { metadata, schemadata };
export default CheckoutEditPage;
