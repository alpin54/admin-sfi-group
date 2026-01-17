// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import memberModel from '@components/Member/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import MemberLandingView from '@components/Member/Landing/views';

// -- data
import summary from '@components/Member/Landing/data/summary';
import dummyData from '@components/Member/Landing/data';

const MemberLandingWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ keyword: '' });

  // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
  //   [pagination.page, pagination.limit, filters]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => memberModel.list(fetchParams), [fetchParams]);

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
    // const { error: errorDelete } = await memberModel.delete(id);
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
    // const { error: errorSuspend } = await memberModel.suspend(payload);
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
    <MemberLandingView
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

export default MemberLandingWidget;
