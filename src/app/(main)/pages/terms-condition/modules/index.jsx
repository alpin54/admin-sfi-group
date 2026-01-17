'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import TermsConditionsWidgets from '@components/Pages/TermsConditions/Landing/widgets/Default';

const TermsConditions = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <TermsConditionsWidgets method='view' />;
};

export default TermsConditions;
