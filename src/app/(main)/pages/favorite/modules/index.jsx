'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import FavoriteWidgets from '@components/Pages/Favorite/Landing/widgets/Default';

const Favorite = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <FavoriteWidgets method='view' />;
};

export default Favorite;
