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
import ProductAddWidgets from '@components/Product/Form/widgets/Default';

const ProductAdd = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const action = segments[2];
  // permission
  const permissions = usePermission('/product');

  useEffect(() => {
    setMenu('product');
  }, [setMenu]);

  if (!permissions.canCreate) {
    return <DeniedAccess />;
  }

  return <ProductAddWidgets action={action} />;
};

export default ProductAdd;
