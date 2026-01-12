'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import SignInWidgets from '@components/Pages/SignIn/Landing/widgets/Default';

const SignIn = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <SignInWidgets method='edit' />;
};

export default SignIn;
