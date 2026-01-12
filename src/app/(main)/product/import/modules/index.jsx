'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import ImportWidget from '@components/Product/Import/widgets/Default';

const Import = () => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/product');

  useEffect(() => {
    setMenu('product');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <ImportWidget />;
};

export default Import;
