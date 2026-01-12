// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import HeroBanner from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Add Hero Banner',
  link: 'pages/home/hero-banner/add'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// HeroBannerPage
// ==================

const HeroBannerPage = async () => {
  return <HeroBanner />;
};

export { metadata, schemadata };
export default HeroBannerPage;
