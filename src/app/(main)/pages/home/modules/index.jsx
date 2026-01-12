'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import HomeWidgets from '@components/Pages/Home/Landing/widgets/Default';

const Home = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <HomeWidgets method='view' />;
};

export default Home;
