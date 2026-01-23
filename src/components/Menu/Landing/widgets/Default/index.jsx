import { useState, useMemo /* , useCallback */ } from 'react';
// import menuModel from '@components/Menu/Landing/models';
// import useFirstLoad from '@hooks/useFirstLoad';
import CareerJobTypeView from '@components/Menu/Landing/views';
import data from '@components/Menu/Landing/data';

const MenuLandingWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit }),
  //   [pagination.page, pagination.limit]
  // );
  // const fetcher = useCallback(() => menuModel.list(fetchParams), [fetchParams]);
  // const { ready, data, refetch } = useFirstLoad(fetcher);

  // Pagination handler
  const handlePageChange = (page, limit) => setPagination({ page, limit });

  const handleStatus = async (payload) => {
    // const { error: errorStatus } = await menuModel.status(payload);
    // if (!errorStatus) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return { error: errorStatus?.message };
    // }
  };

  // const refetch = () => {}; // Uncomment when integrated

  return (
    <CareerJobTypeView
      data={data}
      loading={false}
      pagination={pagination}
      totalPage={data?.total || 10}
      onPageChange={handlePageChange}
      onStatus={handleStatus}
      // refetch={refetch}
    />
  );
};

export default MenuLandingWidget;
