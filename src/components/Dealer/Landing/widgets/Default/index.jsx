// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import dealerModel from '@components/Dealer/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import DealerLandingView from '@components/Dealer/Landing/views';

// -- data
import summary from '@components/Dealer/Landing/data/summary';
import dummyData from '@components/Dealer/Landing/data';

const DealerLandingWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ keyword: '' });

  // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
  //   [pagination.page, pagination.limit, filters]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => dealerModel.list(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready, data, refetch } = useFirstLoad(fetcher);

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
    // const { error: errorDelete } = await dealerModel.delete(id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  // Handle suspend then refetch
  const handleSuspend = async (payload) => {
    // const { error: errorSuspend } = await dealerModel.suspend(payload);
    // if (!errorSuspend) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorSuspend?.message
    //   };
    // }
  };

  return (
    <DealerLandingView
      summary={summary}
      data={dummyData?.data}
      loading={false}
      pagination={pagination}
      filters={filters}
      totalPage={dummyData?.total}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
      onSuspend={handleSuspend}
    />
  );
};

export default DealerLandingWidget;
