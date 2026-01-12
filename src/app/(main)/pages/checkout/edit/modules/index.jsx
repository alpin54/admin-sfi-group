'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import CheckoutWidgets from '@components/Pages/Checkout/Landing/widgets/Default';

const Checkout = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <CheckoutWidgets method='edit' />;
};

export default Checkout;
