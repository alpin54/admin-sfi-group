// -- libraries
import { useCallback } from 'react';

// -- models
import categoryModel from '@components/Product/Category/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ProductCategoryView from '@components/Product/Category/views';

// -- data
import dummyData from '@components/Product/Category/data';

const ProductCategoryWidget = () => {
  // Fetch category
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => categoryModel.list(), []));

  // Handle delete then refetch
  const handleDelete = async (type, id) => {
    // const { error: errorDelete } = await categoryModel.delete(type, id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  // Handle status then refetch
  const handleStatus = async (type, payload) => {
    // const { error: errorStatus } = await categoryModel.status(type, payload);
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
    <ProductCategoryView
      data={dummyData?.data}
      loading={false}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={() => {}}
    />
  );
};

export default ProductCategoryWidget;
