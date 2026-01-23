// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import MemberSetting from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Member Setting',
  link: 'member-setting'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Member Setting Page
// ==================

const MemberSettingpage = async () => {
  return <MemberSetting />;
};

export { metadata, schemadata };
export default MemberSettingpage;
