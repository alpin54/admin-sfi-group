// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VoucherAdd from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Add Voucher',
  link: 'voucher/add'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VoucherAddPage
// ==================

const VoucherAddPage = async () => {
  return <VoucherAdd />;
};

export { metadata, schemadata };
export default VoucherAddPage;
