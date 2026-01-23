// -- libraries
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

// -- models
import modalProductModel from '@components/Voucher/ModalProduct/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ModalProductView from '@components/Voucher/ModalProduct/views';

// -- dummy data
import dummyData from '@components/Product/Landing/data';

const ModalProductWidget = (props) => {
  // Pagination: current page, limit per page
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ keyword: '' });

  // All loaded products (for infinite scroll)
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Ref to list container (for scroll event)
  const listRef = useRef(null);

  // Fetch parameter
  const fetchParams = useMemo(
    () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
    [pagination.page, pagination.limit, filters]
  );

  // Fetcher function
  // const fetcher = useCallback(() => modalProductModel.list(fetchParams), [fetchParams]);

  // // UseFirstLoad: ready, loading, data
  // const { ready, loading, data } = useFirstLoad(fetcher);

  // Reset products & pagination saat filter berubah
  useEffect(() => {
    setProducts([]);
    setPagination({ page: 1, limit: 10 });
    setHasMore(true);
  }, [filters]);

  // Set products setiap kali data berubah
  // useEffect(() => {
  //   if (ready && data) {
  //     // Untuk halaman pertama, ganti list
  //     if (pagination.page === 1) {
  //       setProducts(data?.data || []);
  //     } else {
  //       // Untuk halaman berikutnya, gabung
  //       setProducts((prev) => [...prev, ...(data?.data || [])]);
  //     }
  //     // Cek apakah sudah halaman terakhir
  //     setHasMore((data?.data || []).length === pagination.limit);
  //   }
  // }, [ready, data, pagination.page, pagination.limit]);

  // // Scroll handler: Tambah page jika scroll dekat bawah
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!listRef.current || loading || !hasMore) return;
  //     const { scrollTop, scrollHeight, clientHeight } = listRef.current;
  //     if (scrollHeight - scrollTop - clientHeight < 100) {
  //       setPagination((prev) => {
  //         // Hindari double increment page
  //         if (loading) return prev;
  //         return { ...prev, page: prev.page + 1 };
  //       });
  //     }
  //   };
  //   const ref = listRef.current;
  //   if (ref) {
  //     ref.addEventListener('scroll', handleScroll);
  //   }
  //   return () => {
  //     if (ref) {
  //       ref.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [loading, hasMore]);

  // Handle filter dari View
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => {
      if (prev.keyword === newFilters.keyword) return prev;
      return { ...prev, ...newFilters };
    });
    setPagination({ page: 1, limit: 10 });
  };

  return (
    <ModalProductView
      {...props}
      products={dummyData.data}
      filters={filters}
      loading={false}
      onFilterChange={handleFilterChange}
      listRef={listRef}
    />
  );
};

export default ModalProductWidget;
