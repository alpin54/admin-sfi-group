'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import ReturnRefundPolicyWidgets from '@components/Pages/ReturnRefundPolicy/Landing/widgets/Default';

const ReturnRefundPolicy = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <ReturnRefundPolicyWidgets method='view' />;
};

export default ReturnRefundPolicy;
