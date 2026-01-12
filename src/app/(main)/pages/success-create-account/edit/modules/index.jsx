'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import SuccessCreateAccountWidgets from '@components/Pages/SuccessCreateAccount/Landing/widgets/Default';

const SuccessCreateAccount = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <SuccessCreateAccountWidgets method='edit' />;
};

export default SuccessCreateAccount;
