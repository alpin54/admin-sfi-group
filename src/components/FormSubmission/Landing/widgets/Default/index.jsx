import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

// --models
import formSubmissionModel from '@components/FormSubmission/Landing/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// --components
import FormSubmissionView from '@components/FormSubmission/Landing/views';

// NOTE: removed dummy data import and integrated real summary endpoint

const FormSubmissionWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ keyword: '' });
  const [dateRange, setDateRange] = useState([null, null]);

  // Combine parameters for API
  const fetchParams = useMemo(() => {
    const params = { page: pagination.page, limit: pagination.limit, ...filters };
    if (dateRange && dateRange[0] && dateRange[1]) {
      params.start_date = dayjs(dateRange[0]).format('YYYY-MM-DD');
      params.end_date = dayjs(dateRange[1]).format('YYYY-MM-DD');
    }
    return params;
  }, [pagination.page, pagination.limit, filters, dateRange]);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Create fetchers for list and summary using same params
  const fetcherList = useCallback(() => formSubmissionModel.list(fetchParams), [fetchParams]);
  const fetcherSummary = useCallback(() => formSubmissionModel.summary(fetchParams), [fetchParams]);

  // Hook to fetch list data
  const { ready: readyList, data, refetch: refetchList } = useFirstLoad(fetcherList);

  // Hook to fetch summary data
  const { ready: readySummary, data: summaryRaw, refetch: refetchSummary } = useFirstLoad(fetcherSummary);

  // Handle pagination (from View)
  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle filter (from View)
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDelete = async (id) => {
    const { error: errorDelete } = await formSubmissionModel.delete(id);
    if (!errorDelete) {
      // refetch both list and summary after delete
      if (typeof refetchList === 'function') await refetchList();
      if (typeof refetchSummary === 'function') await refetchSummary();
    }
  };

  const unwrapEnvelope = (payload) => {
    if (!payload || typeof payload !== 'object') return payload;
    if (payload.data !== undefined) payload = payload.data;
    if (payload && typeof payload === 'object' && payload.data !== undefined) payload = payload.data;
    return payload;
  };

  const toNormalized = (payload) => {
    const resp = unwrapEnvelope(payload);
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    const listKeys = ['list', 'results', 'items', 'rows', 'data'];
    for (const k of listKeys) {
      if (resp[k] && Array.isArray(resp[k])) {
        return resp[k];
      }
    }
    // single object -> wrap into array
    if (typeof resp === 'object' && resp.id !== undefined) return [resp];
    return [];
  };

  const normalizedData = useMemo(
    () => {
      toNormalized(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const applyClientFilters = (payload) => {
    if (!payload) return [];
    const kw = (filters?.keyword || '').toString().toLowerCase().trim();
    const start = dateRange && dateRange[0] ? dayjs(dateRange[0]).startOf('day') : null;
    const end = dateRange && dateRange[1] ? dayjs(dateRange[1]).endOf('day') : null;

    const recordMatches = (rec) => {
      if (!rec) return false;
      if (start && end && rec.created_at) {
        const created = dayjs(rec.created_at);
        const afterOrSame = created.isAfter(start) || created.isSame(start);
        const beforeOrSame = created.isBefore(end) || created.isSame(end);
        if (!(afterOrSame && beforeOrSame)) return false;
      }
      if (kw) {
        const hay = `${rec.full_name ?? ''} ${rec.phone ?? ''} ${rec.email ?? ''}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    };

    return payload.filter(recordMatches);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const finalList = useMemo(() => applyClientFilters(normalizedData), [normalizedData, filters, dateRange]);

  // Build payload expected by FormSubmissionView (data.data usage)
  const finalPayload = useMemo(() => {
    return { data: finalList, total: finalList.length };
  }, [finalList]);

  // Normalize / unwrap summary payload and provide safe defaults
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unwrappedSummary = unwrapEnvelope(summaryRaw) || {};
  const summaryData = useMemo(() => {
    // If API returns { data: { total_all, total_today } } unwrapEnvelope would've stripped the outer data.
    // We accept either { total_all, total_today } or nested shapes; provide default of zero when missing.
    const tAll = unwrappedSummary.total_all ?? unwrappedSummary.total ?? 0;
    const tToday = unwrappedSummary.total_today ?? unwrappedSummary.today ?? 0;
    return { total_all: tAll, total_today: tToday };
  }, [unwrappedSummary]);

  const loading = !(readyList && readySummary);

  return (
    <FormSubmissionView
      summaryData={summaryData}
      data={finalPayload}
      loading={loading}
      pagination={pagination}
      filters={filters}
      dateRange={dateRange}
      setDateRange={handleDateRangeChange}
      totalPage={data?.total ?? 1}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
    />
  );
};

export default FormSubmissionWidget;
