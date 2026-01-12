'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import ContactUsWidgets from '@components/Pages/ContactUs/Landing/widgets/Default';

const ContactUs = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <ContactUsWidgets method='view' />;
};

export default ContactUs;
