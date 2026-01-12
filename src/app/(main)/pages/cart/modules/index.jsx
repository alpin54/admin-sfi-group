'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import CartWidgets from '@components/Pages/Cart/Landing/widgets/Default';

const Cart = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <CartWidgets method='view' />;
};

export default Cart;
