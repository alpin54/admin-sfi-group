// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formHomeSection4Model from '@components/Pages/Home/FormSection4/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormHomeSection4View from '@components/Pages/Home/FormSection4/views';

// -- data
// import data from '@components/Pages/Home/FormSection4/data';

const FormHomeSection4Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formHomeSection4Model.list(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formHomeSection4Model.publish(payload);
    if (!errorPublish) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorPublish?.message
      };
    }
  };

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await formHomeSection4Model.submit(formData, method);

      if (error) {
        setMessage(error.message);
      }

      if (data) {
        refetch();
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
    <FormHomeSection4View
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      onPublish={handlePublish}
      onSubmit={handleSubmit}
    />
  );
};

export default FormHomeSection4Widget;
