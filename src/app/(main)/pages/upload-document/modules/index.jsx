'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import UploadDocumentWidgets from '@components/Pages/UploadDocument/Landing/widgets/Default';

const UploadDocument = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <UploadDocumentWidgets method='view' />;
};

export default UploadDocument;
