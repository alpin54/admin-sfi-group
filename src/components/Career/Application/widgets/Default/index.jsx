// -- libraries
import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

// -- models
import careerApplicationModel from '@components/Career/Application/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// --components
import CareerApplicationView from '@components/Career/Application/views';

const CareerApplicationWidget = ({ slug }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ keyword: '' });

  const { data: summaryData, refetch: refetchSummary } = useFirstLoad(
    useCallback(() => {
      // If dateRange is selected, call summary(params, id). Otherwise call summary(id) to get per-career total.
      if (dateRange && dateRange[0] && dateRange[1]) {
        return careerApplicationModel.summary(
          {
            start_date: dayjs(dateRange[0]).format('YYYY-MM-DD'),
            end_date: dayjs(dateRange[1]).format('YYYY-MM-DD')
          },
          slug
        );
      }
      return careerApplicationModel.summary(slug);
    }, [dateRange, slug]),
    []
  );

  const fetchParams = useMemo(() => {
    const params = { page: pagination.page, limit: pagination.limit, ...filters };
    if (dateRange && dateRange[0] && dateRange[1]) {
      params.start_date = dayjs(dateRange[0]).format('YYYY-MM-DD');
      params.end_date = dayjs(dateRange[1]).format('YYYY-MM-DD');
    }
    return params;
  }, [pagination.page, pagination.limit, filters, dateRange]);

  const fetcher = useCallback(() => {
    const paramsWithCareer = slug ? { ...fetchParams, career_id: slug } : fetchParams;
    return careerApplicationModel.list(paramsWithCareer);
  }, [fetchParams, slug]);

  // Hook to fetch data and refetch
  const { ready, data, refetch } = useFirstLoad(fetcher);

  const handlePageChange = (page, limit) => {
    setPagination({ page, limit });
  };

  // Handle filter (from View)
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // When date range changes, reset pagination to page 1 to avoid stale pages
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDelete = async (id) => {
    const { error: errorDelete } = await careerApplicationModel.delete(id);
    if (!errorDelete) {
      refetch();
      if (typeof refetchSummary === 'function') refetchSummary();
    }
  };

  // Handle selected then refetch
  const handleSelected = async (payload) => {
    const { error: errorSelected } = await careerApplicationModel.selected(payload);
    if (!errorSelected) {
      refetch();
      if (typeof refetchSummary === 'function') refetchSummary();
    }
  };

  // Helpers: normalize response and filter by career id
  const unwrapEnvelope = (payload) => {
    if (!payload || typeof payload !== 'object') return payload;
    // unwrap up to two nested `data` keys
    if (payload.data !== undefined) payload = payload.data;
    if (payload && typeof payload === 'object' && payload.data !== undefined) payload = payload.data;
    return payload;
  };

  const toNormalized = (payload) => {
    const resp = unwrapEnvelope(payload);
    if (!resp) return undefined;
    if (Array.isArray(resp)) return resp;
    const listKeys = ['list', 'results', 'items', 'rows', 'data'];
    for (const k of listKeys) {
      if (resp[k] && Array.isArray(resp[k])) {
        return k === 'list' ? resp : { ...resp, list: resp[k] };
      }
    }
    if (typeof resp === 'object' && resp.id !== undefined) return [resp];
    return resp;
  };

  const normalizedData = toNormalized(data);

  // Helper to extract career id from a record — simplified to use only `career_id` for cleanliness
  const getCareerId = (rec) => {
    if (!rec) return undefined;
    return rec.career_id;
  };

  const filterByCareerId = (payload, careerId) => {
    if (!careerId || !payload) return payload;
    const idStr = String(careerId);
    if (Array.isArray(payload)) return payload.filter((r) => String(getCareerId(r)) === idStr);
    if (payload && Array.isArray(payload.list)) {
      const list = payload.list.filter((r) => String(getCareerId(r)) === idStr);
      return { ...payload, list, total: typeof payload.total === 'number' ? list.length : payload.total };
    }
    return payload;
  };

  const filteredBySlug = filterByCareerId(normalizedData, slug);

  // Client-side final filtering as a fallback (ensures date range + keyword are enforced in the UI
  // even if the backend doesn't correctly combine filters like keyword + date range)
  const applyClientFilters = (payload) => {
    if (!payload) return payload;

    const kw = (filters?.keyword || '').toString().toLowerCase().trim();
    const start = dateRange && dateRange[0] ? dayjs(dateRange[0]).startOf('day') : null;
    const end = dateRange && dateRange[1] ? dayjs(dateRange[1]).endOf('day') : null;

    const recordMatches = (rec) => {
      if (!rec) return false;
      // date check
      if (start && end && rec.created_at) {
        const created = dayjs(rec.created_at);
        // use isAfter/isBefore/isSame to avoid requiring isBetween plugin
        const afterOrSame = created.isAfter(start) || created.isSame(start);
        const beforeOrSame = created.isBefore(end) || created.isSame(end);
        if (!(afterOrSame && beforeOrSame)) return false;
      }
      // keyword check (search in name, phone, email)
      if (kw) {
        const hay = `${rec.full_name ?? ''} ${rec.phone ?? ''} ${rec.email ?? ''}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    };

    if (Array.isArray(payload)) {
      return payload.filter(recordMatches);
    }

    if (payload && Array.isArray(payload.list)) {
      const list = payload.list.filter(recordMatches);
      return { ...payload, list, total: typeof payload.total === 'number' ? list.length : payload.total };
    }

    return payload;
  };

  const finalData = applyClientFilters(filteredBySlug);

  return (
    <CareerApplicationView
      summary={summaryData?.data ?? summaryData}
      data={finalData}
      loading={!ready}
      pagination={pagination}
      filters={filters}
      dateRange={dateRange}
      setDateRange={handleDateRangeChange}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
      onSelected={handleSelected}
      refetch={refetch}
      // categoryJobTypeOptions={categoryJobTypeOptions}
      // categoryWorkplaceOptions={categoryWorkplaceOptions}
    />
  );
};

export default CareerApplicationWidget;
