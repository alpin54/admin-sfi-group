'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import SignInWidget from '@components/SignIn/widgets/Default';

const SignIn = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('sign-in');
  }, [setMenu]);

  return <SignInWidget />;
};

export default SignIn;
