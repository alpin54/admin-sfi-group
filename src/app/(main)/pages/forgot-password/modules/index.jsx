'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import ForgotPasswordWidgets from '@components/Pages/ForgotPassword/Landing/widgets/Default';

const ForgotPassword = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <ForgotPasswordWidgets method='view' />;
};

export default ForgotPassword;
