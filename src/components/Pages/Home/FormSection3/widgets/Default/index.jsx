// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formHomeSection3Model from '@components/Pages/Home/FormSection3/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormHomeSection3View from '@components/Pages/Home/FormSection3/views';

// -- data
// import data from '@components/Pages/Home/FormSection3/data';

const FormHomeSection3Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formHomeSection3Model.list(), []));

  // Fetch product product
  const { data: productOptionsData } = useFirstLoad(useCallback(() => formHomeSection3Model.product(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formHomeSection3Model.publish(payload);
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
  const handleSubmit = async (payload, section) => {
    setLoading(true);
    setMessage('');

    try {
      const { data: sectionData, error: sectionError } = await formHomeSection3Model.submitSection(section);
      const { data, error } = await formHomeSection3Model.submit(payload);

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
    <FormHomeSection3View
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      productOptions={productOptionsData?.data}
      onPublish={handlePublish}
      onSubmit={handleSubmit}
    />
  );
};

export default FormHomeSection3Widget;
