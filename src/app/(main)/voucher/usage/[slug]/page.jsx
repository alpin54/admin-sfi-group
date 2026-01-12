// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VoucherUsage from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Usage Voucher',
  link: 'voucher/usage/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VoucherUsagePage
// ==================

const VoucherUsagePage = async () => {
  return <VoucherUsage />;
};

export { metadata, schemadata };
export default VoucherUsagePage;
