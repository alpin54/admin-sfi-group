'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import AboutUsWidgets from '@components/Pages/AboutUs/Landing/widgets/Default';

const AboutUs = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <AboutUsWidgets method='edit' />;
};

export default AboutUs;
