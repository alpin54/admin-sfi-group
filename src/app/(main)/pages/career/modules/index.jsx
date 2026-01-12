'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import CareerWidgets from '@components/Pages/Career/Landing/widgets/Default';

const Career = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <CareerWidgets method='view' />;
};

export default Career;
