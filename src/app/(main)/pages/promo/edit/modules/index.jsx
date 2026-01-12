'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import PromoWidgets from '@components/Pages/Promo/Landing/widgets/Default';

const Promo = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <PromoWidgets method='edit' />;
};

export default Promo;
