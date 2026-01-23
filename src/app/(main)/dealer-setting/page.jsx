// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DealerSetting from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Dealer Setting',
  link: 'dealer-setting'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Dealer Setting Page
// ==================

const DealerSettingPage = async () => {
  return <DealerSetting />;
};

export { metadata, schemadata };
export default DealerSettingPage;
