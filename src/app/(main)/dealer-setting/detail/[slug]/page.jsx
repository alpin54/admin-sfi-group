// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VoucherDetail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Voucher',
  link: 'dealer-setting/detail/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VoucherDetailPage
// ==================

const VoucherDetailPage = async () => {
  return <VoucherDetail />;
};

export { metadata, schemadata };
export default VoucherDetailPage;
