// -- libraries;
import { useState, useCallback, useMemo } from 'react';

// -- models
import voucherModel from '@components/Voucher/Usage/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import VoucherUsageView from '@components/Voucher/Usage/views';

// -- data
// import data from '@components/Voucher/Usage/data';

const VoucherUsageWidget = (props) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ start_date: null, end_date: null, status: null, keyword: '' });

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
    [pagination.page, pagination.limit, filters]
  );

  // Create a dynamic fetcher, depending on parameters
  const fetcher = useCallback(() => voucherModel.list(props.slug, fetchParams), [props.slug, fetchParams]);

  // Hook to fetch data and refetch
  const { ready, data } = useFirstLoad(fetcher);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle filter (from View)
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <VoucherUsageView
      slug={props.slug ?? null}
      data={data}
      loading={!ready}
      pagination={pagination}
      filters={filters}
      totalPage={data?.total}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
    />
  );
};

export default VoucherUsageWidget;
