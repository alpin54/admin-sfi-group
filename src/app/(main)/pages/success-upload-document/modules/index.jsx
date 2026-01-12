'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import SuccessUploadDocumentWidgets from '@components/Pages/SuccessUploadDocument/Landing/widgets/Default';

const SuccessUploadDocument = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <SuccessUploadDocumentWidgets method='view' />;
};

export default SuccessUploadDocument;
