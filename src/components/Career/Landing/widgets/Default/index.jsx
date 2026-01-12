// -- libraries
import { useState, useMemo, useCallback } from 'react';

// --models
import careerModel from '@components/Career/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import CareerView from '@components/Career/Landing/views';

// Widget that uses data dummy (client-side filtering & pagination)
const CareerWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ jobType: '', keyword: '' });

  // Combine parameters for API
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
    [pagination.page, pagination.limit, filters]
  );

  // Create a dynamic fetcher, depending on parameters
  const fetcher = useCallback(() => careerModel.list(fetchParams), [fetchParams]);

  // Hook to fetch data and refetch
  const { ready, data, refetch } = useFirstLoad(fetcher);

  // Fetch workplace options
  const { data: categoryDataJobType } = useFirstLoad(useCallback(() => careerModel.jobTypeList(), []));

  // Fetch summary options
  const { data: summaryDataCareer } = useFirstLoad(
    useCallback(() => careerModel.summaryCareer(), []),
    []
  );

  const summaryCareer = {
    total: summaryDataCareer?.data?.total ?? summaryDataCareer?.total ?? data?.total ?? 0
  };

  // Fetch summary options for applications
  const { data: summaryDataApplication } = useFirstLoad(
    useCallback(() => careerModel.summaryApplication(), []),
    []
  );

  const summaryApplication = {
    total: summaryDataApplication?.data?.total ?? summaryDataApplication?.total ?? data?.total ?? 0
  };

  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    const { error: errorDelete } = await careerModel.delete(id);
    if (!errorDelete) refetch();
  };

  const handleSuspend = async (payload) => {
    const { error: errorSuspend } = await careerModel.suspend(payload);
    if (!errorSuspend) refetch();
  };

  return (
    <CareerView
      summaryCareer={summaryCareer}
      summaryApplication={summaryApplication}
      data={data?.data}
      categoryJobTypeOptions={categoryDataJobType?.data}
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

export default CareerWidget;
