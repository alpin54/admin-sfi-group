'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import PrivacyPolicyWidgets from '@components/Pages/PrivacyPolicy/Landing/widgets/Default';

const PrivacyPolicy = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <PrivacyPolicyWidgets method='view' />;
};

export default PrivacyPolicy;
