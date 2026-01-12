// -- libraries
import { useCallback, useMemo, useState } from 'react';

// -- models
import brandModel from '@components/Product/Brand/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ProductBrandView from '@components/Product/Brand/views';

// -- data
import dummyData from '@components/Product/Brand/data';

const ProductBrandWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit }),
  //   [pagination.page, pagination.limit]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => brandModel.list(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready, data, refetch } = useFirstLoad(fetcher);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    // const { error: errorDelete } = await brandModel.delete(id);
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
    // const { error: errorStatus } = await brandModel.status(payload);
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
    <ProductBrandView
      data={dummyData?.data}
      loading={false}
      pagination={pagination}
      totalPage={dummyData?.total}
      onPageChange={handlePageChange}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={() => {}}
    />
  );
};

export default ProductBrandWidget;
