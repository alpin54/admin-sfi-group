'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import OrderLandingWidgets from '@components/Order/Landing/widgets/Default';

const OrderLanding = () => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/order');

  useEffect(() => {
    setMenu('order');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <OrderLandingWidgets />;
};

export default OrderLanding;
