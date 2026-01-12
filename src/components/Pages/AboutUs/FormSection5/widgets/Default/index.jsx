// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formAboutUsSection5Model from '@components/Pages/AboutUs/FormSection5/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormAboutUsSection5View from '@components/Pages/AboutUs/FormSection5/views';

// -- data
import data from '@components/Pages/AboutUs/FormSection5/data';

const FormAboutUsSection5Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formAboutUsSection5Model.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formAboutUsSection5Model.publish(payload);
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
      const { data, error } = await formAboutUsSection5Model.submit(formData, method);

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
    <FormAboutUsSection5View
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

export default FormAboutUsSection5Widget;
