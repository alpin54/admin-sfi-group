// -- libraries
import { useCallback, useMemo, useState } from 'react';

// -- models
import signInBannerModel from '@components/Pages/SignIn/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerSignInView from '@components/Pages/SignIn/Banner/views';

// -- data
import data from '@components/Pages/SignIn/Banner/data';

const BannerSignInWidget = (props) => {
  // const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit }),
  //   [pagination.page, pagination.limit]
  // );
  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => signInBannerModel.list(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready, data, refetch } = useFirstLoad(fetcher);

  // // Handle delete then refetch
  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await signInBannerModel.delete(id);
  //   if (!errorDelete) {
  //     refetch();
  //     return { error: null };
  //   } else {
  //     return {
  //       error: errorDelete?.message
  //     };
  //   }
  // };

  // // Handle status then refetch
  // const handleStatus = async (payload) => {
  //   const { error: errorStatus } = await signInBannerModel.status(payload);
  //   if (!errorStatus) {
  //     refetch();
  //     return { error: null };
  //   } else {
  //     return {
  //       error: errorStatus?.message
  //     };
  //   }
  // };

  return (
    // <BannerSignInView
    //   data={data?.data}
    //   loading={!ready}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   refetch={refetch}
    // />
    <BannerSignInView {...props} data={data} />
  );
};

export default BannerSignInWidget;
