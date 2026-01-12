// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ContactUsEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Contact Us',
  link: 'pages/contact-us/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ContactUsEditPage
// ==================

const ContactUsEditPage = async () => {
  return <ContactUsEdit />;
};

export { metadata, schemadata };
export default ContactUsEditPage;
