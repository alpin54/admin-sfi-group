'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import TermsConditionWidgets from '@components/Pages/TermsCondition/widgets/Default';

const TermsCondition = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <TermsConditionWidgets method='view' />;
};

export default TermsCondition;
