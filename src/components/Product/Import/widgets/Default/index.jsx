// -- libraries
import { useCallback, useMemo, useState } from 'react';

// -- models
import importModel from '@components/Product/Import/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ProductImportView from '@components/Product/Import/views';

// -- data
import dummyData from '@components/Product/Import/data';

const ProductImportWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit }),
  //   [pagination.page, pagination.limit]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => importModel.list(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready, data, refetch } = useFirstLoad(fetcher);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    // const { error: errorDelete } = await importModel.delete(id);
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
    // const { error: errorStatus } = await importModel.status(payload);
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
    <ProductImportView
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

export default ProductImportWidget;
