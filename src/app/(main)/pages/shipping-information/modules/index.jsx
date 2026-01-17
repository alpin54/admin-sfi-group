'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import ShippingInformationWidgets from '@components/Pages/ShippingInformation/Landing/widgets/Default';

const ShippingInformation = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <ShippingInformationWidgets method='view' />;
};

export default ShippingInformation;
