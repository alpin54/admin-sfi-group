'use client';

// -- libraries
import { useCallback } from 'react';

// -- models
import headerModel from '@components/Header/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- components
import HeaderView from '@components/Header/views';

const HeaderWidget = () => {
  const user = LocalStorage.get('user');

  // Fetch user data
  const { data } = useFirstLoad(useCallback(() => headerModel.single(user?.id), [user?.id]));

  return <HeaderView data={data?.data} />;
};

export default HeaderWidget;
