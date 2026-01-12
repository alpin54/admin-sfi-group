// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import adminModel from '@components/Admin/Landing/models';
import roleModel from '@components/Role/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import AdminLandingView from '@components/Admin/Landing/views';

const AdminLandingWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ role_id: null, keyword: '' });

  // Fetch role options
  const { data: roleData } = useFirstLoad(useCallback(() => roleModel.list(), []));

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
    [pagination.page, pagination.limit, filters]
  );

  // Create a dynamic fetcher, depending on parameters
  const fetcher = useCallback(() => adminModel.list(fetchParams), [fetchParams]);

  // Hook to fetch data and refetch
  const { ready, data, refetch } = useFirstLoad(fetcher);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle filter (from View)
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    const { error: errorDelete } = await adminModel.delete(id);
    if (!errorDelete) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorDelete?.message
      };
    }
  };

  // Handle suspend then refetch
  const handleSuspend = async (payload) => {
    const { error: errorSuspend } = await adminModel.suspend(payload);
    if (!errorSuspend) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorSuspend?.message
      };
    }
  };

  return (
    <AdminLandingView
      data={data?.data || []}
      roleOptions={roleData?.data || []}
      loading={!ready}
      pagination={pagination}
      filters={filters}
      totalPage={data?.total}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
      onSuspend={handleSuspend}
      refetch={refetch}
    />
  );
};

export default AdminLandingWidget;
