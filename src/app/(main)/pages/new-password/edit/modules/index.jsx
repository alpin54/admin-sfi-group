'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import NewPasswordWidgets from '@components/Pages/NewPassword/Landing/widgets/Default';

const NewPassword = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <NewPasswordWidgets method='edit' />;
};

export default NewPassword;
