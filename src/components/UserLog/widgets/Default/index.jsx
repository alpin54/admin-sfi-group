// -- libraries
import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- models
import userLogModel from '@components/UserLog/models';
import roleModel from '@components/Role/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import UserLogView from '@components/UserLog/views';

// -- data
import dummyData from '@components/UserLog/data';

const UserLogWidget = () => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ start_date: null, end_date: null, role_id: null });

  // Fetch role options
  const { data: roleData } = useFirstLoad(useCallback(() => roleModel.list(), []));

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
    [pagination.page, pagination.limit, filters]
  );

  // Create a dynamic fetcher, depending on parameters
  const fetcher = useCallback(() => userLogModel.list(fetchParams), [fetchParams]);

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
    <UserLogView
      data={data?.data || []}
      roleOptions={roleData?.data || []}
      loading={!ready}
      pagination={pagination}
      filters={filters}
      totalPage={data?.total}
      dateRange={dateRange}
      setDateRange={setDateRange}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
    />
  );
};

export default UserLogWidget;
