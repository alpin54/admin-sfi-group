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
import Empty from '@components/Elements/Empty/views';

const DealerRewards = () => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/dealer-rewards');
  useEffect(() => {
    setMenu('dealer-rewards');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <Empty title='Under Construction' description='Dealer Rewards page is not available.' />;
};

export default DealerRewards;
