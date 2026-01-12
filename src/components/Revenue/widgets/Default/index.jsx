// -- libraries
import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

// -- models
import revenueModel from '@components/Revenue/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import RevenueLandingView from '@components/Revenue/views';

// -- data
import dummyData from '@components/Revenue/data';

const RevenueLandingWidget = () => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ start_date: null, end_date: null, status: null, keyword: '' });

  // Fetch summary options
  // const { data: summaryData } = useFirstLoad(
  //   useCallback(
  //     () =>
  //       revenueModel.summary({
  //         start_date: dayjs(dateRange[0]).format('YYYY-MM-DD'),
  //         end_date: dayjs(dateRange[1]).format('YYYY-MM-DD')
  //       }),
  //     [dateRange]
  //   ),
  //   []
  // );

  // // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
  //   [pagination.page, pagination.limit, filters]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => revenueModel.list(fetchParams), [fetchParams]);

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
  const handleDelete = async (payload) => {
    // const { error: errorDelete } = await revenueModel.delete(payload);
    // if (!errorDelete) refetch();
  };

  return (
    <RevenueLandingView
      data={dummyData.data}
      summary={dummyData.summary}
      loading={false}
      pagination={pagination}
      filters={filters}
      totalPage={dummyData.total}
      dateRange={dateRange}
      setDateRange={setDateRange}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
    />
  );
};

export default RevenueLandingWidget;
