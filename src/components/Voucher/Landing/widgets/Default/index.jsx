// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import voucherModel from '@components/Voucher/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import VoucherLandingView from '@components/Voucher/Landing/views';

// -- data
import dummyData from '@components/Voucher/Landing/data';

const VoucherLandingWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ start_date: null, end_date: null, status: null, keyword: '' });

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
    [pagination.page, pagination.limit, filters]
  );

  // Create a dynamic fetcher, depending on parameters
  const fetcher = useCallback(() => voucherModel.list(fetchParams), [fetchParams]);

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
  const handleDelete = async (type, id) => {
    const { error: errorDelete } = await voucherModel.delete(type, id);
    if (!errorDelete) refetch();
  };

  // Handle suspend then refetch
  const handleSuspend = async (type, id) => {
    const { error: errorSuspend } = await voucherModel.suspend(type, id);
    if (!errorSuspend) refetch();
  };

  return (
    <VoucherLandingView
      summary={dummyData.summary}
      data={data?.data}
      loading={!ready}
      pagination={pagination}
      filters={filters}
      totalPage={data?.total}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
      onSuspend={handleSuspend}
    />
  );
};

export default VoucherLandingWidget;
