// -- libraries
import { useCallback, useMemo, useState } from 'react';

// -- models
import colorModel from '@components/Product/Color/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ProductColorView from '@components/Product/Color/views';

// -- data
import dummyData from '@components/Product/Color/data';

const ProductColorWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit }),
  //   [pagination.page, pagination.limit]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => colorModel.list(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready, data, refetch } = useFirstLoad(fetcher);

  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  const handleDelete = async (id) => {
    // const { error: errorDelete } = await colorModel.delete(id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  // Suspend/Unsuspend handler receives FormData payload from view
  const handleStatus = async (payload) => {
    // const { error: errorStatus } = await colorModel.status(payload);
    // if (!errorStatus) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorStatus?.message
    //   };
    // }
  };

  return (
    <ProductColorView
      data={dummyData?.data}
      loading={false}
      pagination={pagination}
      totalPage={dummyData?.total}
      onDelete={handleDelete}
      onStatus={handleStatus}
      onPageChange={handlePageChange}
      refetch={() => {}}
    />
  );
};

export default ProductColorWidget;
