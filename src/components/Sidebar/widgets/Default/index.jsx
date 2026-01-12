'use client';

// -- libraries
import { useCallback } from 'react';

// -- models
import sidebarModel from '@components/Sidebar/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- components
import SidebarView from '@components/Sidebar/views';

// -- data
import data from '@components/Sidebar/data';

const SidebarWidget = () => {
  const user = LocalStorage.get('user');
  // fetch data
  // const { data, ready } = useFirstLoad(useCallback(() => sidebarModel.list(user.role_id), [user.role_id]));

  // return <SidebarView data={data?.data} loading={!ready} />;
  return <SidebarView data={data} loading={true} />;
};

export default SidebarWidget;
