'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import EmailForgotPasswordWidgets from '@components/Pages/EmailForgotPassword/Landing/widgets/Default';

const EmailForgotPassword = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <EmailForgotPasswordWidgets method='edit' />;
};

export default EmailForgotPassword;
