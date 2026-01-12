// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formAboutUsSection4Model from '@components/Pages/AboutUs/FormSection4/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormAboutUsSection4View from '@components/Pages/AboutUs/FormSection4/views';

const FormAboutUsSection4Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formAboutUsSection4Model.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formAboutUsSection4Model.publish(payload);
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
      const { data, error } = await formAboutUsSection4Model.submit(formData, method);

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
    <FormAboutUsSection4View
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

export default FormAboutUsSection4Widget;
