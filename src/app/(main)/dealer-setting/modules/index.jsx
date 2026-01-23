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
import DealerVoucher from '@components/Dealer/Voucher/Landing/widgets/Default';

const DealerSetting = () => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/dealer-rewards');
  useEffect(() => {
    setMenu('dealer-setting');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <DealerVoucher />;
};

export default DealerSetting;
