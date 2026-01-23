// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VoucherEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Voucher',
  link: 'dealer-setting/edit/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VoucherEditPage
// ==================

const VoucherEditPage = async () => {
  return <VoucherEdit />;
};

export { metadata, schemadata };
export default VoucherEditPage;
