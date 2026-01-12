// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formHomeSection2Model from '@components/Pages/Home/FormSection2/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormHomeSection2View from '@components/Pages/Home/FormSection2/views';

// -- data
// import data from '@components/Pages/Home/FormSection2/data';

const FormHomeSection2Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formHomeSection2Model.list(), []));

  // Fetch product categories
  const { data: categoryOptionsData } = useFirstLoad(useCallback(() => formHomeSection2Model.productCategory(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formHomeSection2Model.publish(payload);
    if (!errorPublish) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorPublish?.message
      };
    }
  };

  // Handle submit
  const handleSubmit = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await formHomeSection2Model.submit(payload);

      if (error) {
        setMessage(error.message);
      }

      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormHomeSection2View
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      categoryOptions={categoryOptionsData?.data}
      onPublish={handlePublish}
      onSubmit={handleSubmit}
    />
  );
};

export default FormHomeSection2Widget;
