// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import subscribeModel from '@components/Subscribe/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import SubscribeView from '@components/Subscribe/views';

const SubscribeWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ keyword: '' });

  const params = useMemo(() => ({ page: pagination.page, limit: pagination.limit, ...filters }), [pagination, filters]);

  const listFetcher = useCallback(() => subscribeModel.listData(params), [params]);
  const summaryFetcher = useCallback(() => subscribeModel.listSummary(params), [params]);

  const { ready: readyList, data: listData, refetch: refetchList } = useFirstLoad(listFetcher);
  const { ready: readySummary, data: summaryData, refetch: refetchSummary } = useFirstLoad(summaryFetcher);

  const handlePageChange = (page, limit) => setPagination({ page, limit });
  const handleFilterChange = (f) => {
    setFilters((prev) => ({ ...prev, ...f }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDelete = async (id) => {
    const result = await subscribeModel.delete(id);
    if (!result?.error) {
      await Promise.all([refetchList?.(), refetchSummary?.()]);
    }
  };

  const handleDownload = subscribeModel.download();

  const rows = listData?.data || [];
  const total = listData?.total || rows.length;
  const loading = !readyList || !readySummary;

  return (
    <SubscribeView
      data={rows}
      summary={summaryData}
      loading={loading}
      filters={filters}
      pagination={pagination}
      totalPage={total}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
      onDownload={handleDownload}
    />
  );
};

export default SubscribeWidget;
