// -- libraries
import { useState, useCallback } from 'react';

// -- models
import contactUsFormModel from '@components/Pages/ContactUs/FormSection3/models';

// --hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormContactUsSection3View from '@components/Pages/ContactUs/FormSection3/views';

const FormContactUsSection3Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => contactUsFormModel.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await contactUsFormModel.publish(payload);
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
      const { data, error } = await contactUsFormModel.submit(formData, method);

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
    <FormContactUsSection3View
      {...props}
      data={data?.data}
      onPublish={handlePublish}
      onSubmit={handleSubmit}
      ready={!ready}
      loading={loading}
      message={message}
    />
  );
};

export default FormContactUsSection3Widget;
