'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import NotFoundWidgets from '@components/Pages/NotFound/widgets/Default';

const NotFound = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <NotFoundWidgets method='edit' />;
};

export default NotFound;
