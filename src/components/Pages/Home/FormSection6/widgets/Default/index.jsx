// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formHomeSection6Model from '@components/Pages/Home/FormSection6/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormHomeSection6View from '@components/Pages/Home/FormSection6/views';

// -- data
// import data from '@components/Pages/Home/FormSection6/data';

const FormHomeSection6Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formHomeSection6Model.list(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formHomeSection6Model.publish(payload);
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
      const { data, error } = await formHomeSection6Model.submit(formData, method);

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
    <FormHomeSection6View
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

export default FormHomeSection6Widget;
