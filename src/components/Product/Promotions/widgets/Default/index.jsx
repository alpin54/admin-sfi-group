// -- libraries
import { useCallback, useMemo, useState } from 'react';

// -- models
import promotionsModel from '@components/Product/Promotions/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ProductPromotionsView from '@components/Product/Promotions/views';

// -- data
import data from '@components/Product/Promotions/data';

const ProductPromotionsWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit }),
  //   [pagination.page, pagination.limit]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => promotionsModel.list(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready, data, refetch } = useFirstLoad(fetcher);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    // const { error: errorDelete } = await promotionsModel.delete(id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  // Handle status then refetch
  const handleStatus = async (payload) => {
    // const { error: errorStatus } = await promotionsModel.status(payload);
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
    <ProductPromotionsView
      data={data?.data}
      loading={false}
      pagination={pagination}
      totalPage={data?.total}
      onPageChange={handlePageChange}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={() => {}}
    />
  );
};

export default ProductPromotionsWidget;
