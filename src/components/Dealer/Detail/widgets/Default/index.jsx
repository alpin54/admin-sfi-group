// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import dealerModel from '@components/Dealer/Detail/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import DealerDetailView from '@components/Dealer/Detail/views';

// -- data
import dummyData from '@components/Dealer/Detail/data';
import orderData from '@components/Order/Landing/data';

const DealerDetailWidget = ({ slug }) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({
    customer_id: slug,
    start_date: null,
    end_date: null,
    status: null,
    keyword: ''
  });

  // Fetch category options
  // const { data } = useFirstLoad(useCallback(() => dealerModel.detail(slug), [slug]));

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
    [pagination.page, pagination.limit, filters]
  );

  // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => dealerModel.orderList(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready: orderReady, data: orderData, refetch } = useFirstLoad(fetcher);

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
    // const { error: errorDelete } = await dealerModel.orderDelete(payload);
    // if (!errorDelete) refetch();
  };

  return (
    <DealerDetailView
      data={dummyData?.data}
      summary={dummyData?.summary}
      order={orderData?.data}
      loading={false}
      pagination={pagination}
      filters={filters}
      totalPage={orderData?.total}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
    />
  );
};

export default DealerDetailWidget;
