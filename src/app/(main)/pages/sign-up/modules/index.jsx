'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import SignUpWidgets from '@components/Pages/SignUp/Landing/widgets/Default';

const SignUp = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <SignUpWidgets method='view' />;
};

export default SignUp;
