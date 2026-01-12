// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formAboutUsSection3Model from '@components/Pages/AboutUs/FormSection3/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormAboutUsSection3View from '@components/Pages/AboutUs/FormSection3/views';

// -- data
import data from '@components/Pages/AboutUs/FormSection3/data';

const FormAboutUsSection3Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formAboutUsSection3Model.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formAboutUsSection3Model.publish(payload);
    if (!errorPublish) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorPublish?.message
      };
    }
  };

  // Handle Status then refetch
  const handleStatus = async (payload) => {
    const { error: errorStatus } = await formAboutUsSection3Model.status(payload);
    if (!errorStatus) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorStatus?.message
      };
    }
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    const { error: errorDelete } = await formAboutUsSection3Model.delete(id);
    if (!errorDelete) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorDelete?.message
      };
    }
  };

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await formAboutUsSection3Model.submit(formData, method);

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
    <FormAboutUsSection3View
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      onPublish={handlePublish}
      onStatus={handleStatus}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      refetch={refetch}
    />
  );
};

export default FormAboutUsSection3Widget;
