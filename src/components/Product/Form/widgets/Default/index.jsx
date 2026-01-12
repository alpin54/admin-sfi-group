// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formProductModel from '@components/Product/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ProductFormView from '@components/Product/Form/views';

// -- data
import data from '@components/Product/Form/data';
import categoryData from '@components/Product/Category/data';
import brandData from '@components/Product/Brand/data';
import colorData from '@components/Product/Color/data';
import promotionData from '@components/Product/Promotions/data';

const ProductFormWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch product data if slug exists
  // const { data } = useFirstLoad(
  //   useCallback(() => (props.slug ? formProductModel.single(props.slug) : []), [props.slug])
  // );

  // // Only fetch category options
  // const { data: categoryData } = useFirstLoad(useCallback(() => formProductModel.categoryList(), []));

  // // Only fetch brand options
  // const { data: brandData } = useFirstLoad(useCallback(() => formProductModel.brandList(), []));

  // // Only fetch color options
  // const { data: colorData } = useFirstLoad(useCallback(() => formProductModel.colorList(), []));

  // // Only fetch promotion options
  // const { data: promotionData } = useFirstLoad(useCallback(() => formProductModel.promotionList(), []));

  // handle submit
  const handleSubmit = async (payload, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await formProductModel.submit(payload, method);

      // if (error) {
      //   setMessage(error.message);
      // }

      // return data;
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormView
      {...props}
      data={null}
      categoryOptions={categoryData?.data ?? []}
      brandOptions={brandData?.data ?? []}
      colorOptions={colorData?.data ?? []}
      promotionOptions={promotionData?.data ?? []}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default ProductFormWidget;
