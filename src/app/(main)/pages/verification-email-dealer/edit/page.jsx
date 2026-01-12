// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VerificationEmailDealerEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Verification Email Dealer',
  link: 'pages/verification-email-dealer/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VerificationEmailDealerEditPage
// ==================

const VerificationEmailDealerEditPage = async () => {
  return <VerificationEmailDealerEdit />;
};

export { metadata, schemadata };
export default VerificationEmailDealerEditPage;
