'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import FaqWidgets from '@components/Pages/Faq/Landing/widgets/Default';

const Faq = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <FaqWidgets method='view' />;
};

export default Faq;
