// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import HeroBannerEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Hero Banner',
  link: 'pages/home/hero-banner/edit/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// HeroBannerEditPage
// ==================

const HeroBannerEditPage = async () => {
  return <HeroBannerEdit />;
};

export { metadata, schemadata };
export default HeroBannerEditPage;
