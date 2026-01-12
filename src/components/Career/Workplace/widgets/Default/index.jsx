// -- libraries
import { useState, useMemo, useCallback } from 'react';

// -- models
import workplaceModel from '@components/Career/Workplace/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import CareerWorkplaceView from '@components/Career/Workplace/views';

const CareerWorkplaceWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit }),
    [pagination.page, pagination.limit]
  );

  // Create a dynamic fetcher, depending on parameters
  const fetcher = useCallback(() => workplaceModel.list(fetchParams), [fetchParams]);

  // Hook to fetch data and refetch
  const { ready, data, refetch } = useFirstLoad(fetcher);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    const { error: errorDelete } = await workplaceModel.delete(id);
    if (!errorDelete) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorDelete?.message
      };
    }
  };

  // Handle status then refetch
  const handleStatus = async (payload) => {
    const { error: errorStatus } = await workplaceModel.status(payload);
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
    <CareerWorkplaceView
      data={data?.data}
      loading={!ready}
      pagination={pagination}
      totalPage={data?.total}
      onPageChange={handlePageChange}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={refetch}
    />
  );
};

export default CareerWorkplaceWidget;
