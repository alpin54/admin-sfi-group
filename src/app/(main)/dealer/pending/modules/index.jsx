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
import DealerPendingWidgets from '@components/Dealer/Pending/widgets/Default';

const DealerPending = () => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/dealer');

  useEffect(() => {
    setMenu('dealer-pending');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <DealerPendingWidgets />;
};

export default DealerPending;
