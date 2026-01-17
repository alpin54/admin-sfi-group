// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ReturnRefunPolicyEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Return & Refund Policy',
  link: 'pages/return-refund-policy/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ReturnRefunPolicyEditPage
// ==================

const ReturnRefunPolicyEditPage = async () => {
  return <ReturnRefunPolicyEdit />;
};

export { metadata, schemadata };
export default ReturnRefunPolicyEditPage;
