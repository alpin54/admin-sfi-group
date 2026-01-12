'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import ShippingReturnWidgets from '@components/Pages/ShippingReturn/widgets/Default';

const ShippingReturn = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <ShippingReturnWidgets method='edit' />;
};

export default ShippingReturn;
