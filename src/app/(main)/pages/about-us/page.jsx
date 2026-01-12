// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import AboutUs from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail About Us',
  link: 'pages/about-us'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AboutUsPage
// ==================

const AboutUsPage = async () => {
  return <AboutUs />;
};

export { metadata, schemadata };
export default AboutUsPage;
