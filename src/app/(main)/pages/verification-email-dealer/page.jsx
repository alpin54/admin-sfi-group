// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VerificationEmailDealer from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Verification Email Dealer',
  link: 'pages/verification-email-dealer'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VerificationEmailDealerPage
// ==================

const VerificationEmailDealerPage = async () => {
  return <VerificationEmailDealer />;
};

export { metadata, schemadata };
export default VerificationEmailDealerPage;
