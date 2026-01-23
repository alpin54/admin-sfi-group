// -- libraries
import { useState, useCallback, useMemo } from 'react';

// -- models
import productModel from '@components/Product/Review/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ProductReviewView from '@components/Product/Review/views';

// -- data
import dataDummy from '@components/Product/Review/data';

const ProductReviewWidget = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ rating: null, keyword: '' });

  // Fetch category options
  // const { data: categoryData } = useFirstLoad(useCallback(() => productModel.categoryList(), []));

  // // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit, ...filters }),
  //   [pagination.page, pagination.limit, filters]
  // );

  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => productModel.list(fetchParams), [fetchParams]);

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
  const handleDelete = async (type, id) => {
    // const { error: errorDelete } = await productModel.delete(type, id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  // Handle Status then refetch
  const handleStatus = async (type, payload) => {
    // const { error: errorStatus } = await productModel.status(type, payload);
    // if (!errorStatus) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorStatus?.message
    //   };
    // }
  };

  return (
    <ProductReviewView
      summary={dataDummy.summary}
      data={dataDummy?.data}
      loading={false}
      pagination={pagination}
      filters={filters}
      totalPage={dataDummy?.total}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      onDelete={handleDelete}
      onStatus={handleStatus}
    />
  );
};

export default ProductReviewWidget;
