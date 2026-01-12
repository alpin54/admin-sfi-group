'use client';

// -- libraries
import { useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import VoucherEditWidgets from '@components/Voucher/Form/widgets/Default';

const VoucherEdit = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const params = useParams();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const slug = params.slug;
  const action = segments[2];
  // permission
  const permissions = usePermission('/voucher');

  useEffect(() => {
    setMenu('voucher');
  }, [setMenu]);

  if (!permissions.canEdit) {
    return <DeniedAccess />;
  }

  return <VoucherEditWidgets slug={slug} action={action} />;
};

export default VoucherEdit;
