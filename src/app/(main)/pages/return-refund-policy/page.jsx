// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ReturnRefundPolicy from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Return & Refund Policy',
  link: 'pages/return-refund-policy'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ReturnRefundPolicyPage
// ==================

const ReturnRefundPolicyPage = async () => {
  return <ReturnRefundPolicy />;
};

export { metadata, schemadata };
export default ReturnRefundPolicyPage;
