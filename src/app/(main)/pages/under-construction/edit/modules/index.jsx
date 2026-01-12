'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import UnderConstructionWidgets from '@components/Pages/UnderConstruction/widgets/Default';

const UnderConstruction = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <UnderConstructionWidgets method='edit' />;
};

export default UnderConstruction;
