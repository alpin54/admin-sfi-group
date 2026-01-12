// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Voucher from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Voucher',
  link: 'voucher'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VoucherPage
// ==================

const VoucherPage = async () => {
  return <Voucher />;
};

export { metadata, schemadata };
export default VoucherPage;
