// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import roleModel from '@components/Role/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import RoleLandingView from '@components/Role/Landing/views';

const RoleLandingWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit }),
    [pagination.page, pagination.limit]
  );

  // Create a dynamic fetcher, depending on parameters
  const fetcher = useCallback(() => roleModel.list(fetchParams), [fetchParams]);

  // Hook to fetch data and refetch
  const { ready, data, error, refetch } = useFirstLoad(fetcher);

  // Only fetch access options
  const { data: accessOptions } = useFirstLoad(useCallback(() => roleModel.menuList(), []));

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    const { error: errorDelete } = await roleModel.delete(id);
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
    const { error: errorStatus } = await roleModel.status(payload);
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
    <RoleLandingView
      accessOptions={accessOptions?.data ?? []}
      data={data?.data}
      loading={!ready}
      error={error}
      totalPage={data?.total}
      pagination={pagination}
      onPageChange={handlePageChange}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={refetch}
    />
  );
};

export default RoleLandingWidget;
