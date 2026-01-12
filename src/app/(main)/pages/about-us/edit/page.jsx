// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import AboutUsEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit About Us',
  link: 'pages/about-us/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AboutUsEditPage
// ==================

const AboutUsEditPage = async () => {
  return <AboutUsEdit />;
};

export { metadata, schemadata };
export default AboutUsEditPage;
