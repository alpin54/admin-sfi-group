'use client';

// -- libraries
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import VoucherAddWidgets from '@components/Dealer/Voucher/Form/widgets/Default';

const VoucherAdd = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const action = segments[2];
  // permission
  const permissions = usePermission('/voucher');

  useEffect(() => {
    setMenu('voucher');
  }, [setMenu]);

  if (!permissions.canCreate) {
    return <DeniedAccess />;
  }

  return <VoucherAddWidgets action={action} />;
};

export default VoucherAdd;
