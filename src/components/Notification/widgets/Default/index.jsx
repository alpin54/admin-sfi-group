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
import NotificationModel from '@components/Notification/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import NotificationView from '@components/Notification/views';

// -- data
import dummyData from '@components/Notification/data';

const NotificationWidget = () => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit, start_date: dateRange[0]?.toISOString(), end_date: dateRange[1]?.toISOString() }),
  //   [pagination.page, pagination.limit, dateRange]
  // );

  // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => NotificationModel.list(fetchParams), [fetchParams]);

  // Hook to fetch data and refetch
  // const { ready, data } = useFirstLoad(fetcher);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  return (
    <NotificationView
      data={dummyData?.data || []}
      loading={false}
      pagination={pagination}
      totalPage={dummyData?.total}
      dateRange={dateRange}
      setDateRange={setDateRange}
      onPageChange={handlePageChange}
    />
  );
};

export default NotificationWidget;
