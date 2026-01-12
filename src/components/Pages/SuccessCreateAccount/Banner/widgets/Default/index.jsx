// -- libraries
import { useCallback, useMemo, useState } from 'react';

// -- models
import successCreateAccountBannerModel from '@components/Pages/SuccessCreateAccount/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerSuccessCreateAccountView from '@components/Pages/SuccessCreateAccount/Banner/views';

const BannerSuccessCreateAccountWidget = (props) => {
  const fetchParams = useMemo(() => ({}), []);

  const fetcher = useCallback(() => successCreateAccountBannerModel.list(fetchParams), [fetchParams]);

  const { data, ready, refetch } = useFirstLoad(fetcher);

  const handleDelete = async (id) => {
    const { error: errorDelete } = await successCreateAccountBannerModel.delete(id);
    if (!errorDelete) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorDelete?.message
      };
    }
  };

  const handleStatus = async (payload) => {
    const { error: errorStatus } = await successCreateAccountBannerModel.status(payload);
    if (!errorStatus) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorStatus?.message
      };
    }
  };
  return (
    <BannerSuccessCreateAccountView
      data={data?.data}
      loading={!ready}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={refetch}
    />
  );
};

export default BannerSuccessCreateAccountWidget;
