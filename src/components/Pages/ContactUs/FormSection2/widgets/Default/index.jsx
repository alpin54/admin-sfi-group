// -- libraries
import { useState, useCallback } from 'react';

// -- models
import contactUsFormSection2Model from '@components/Pages/ContactUs/FormSection2/models';

// --hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormContactUsSection2View from '@components/Pages/ContactUs/FormSection2/views';

// -- data
import data from '@components/Pages/ContactUs/FormSection2/data';

const FormContactUsSection2Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => contactUsFormSection2Model.single(), []));

  const handlePublish = async (payload) => {
    const { error: errorPublish } = await contactUsFormSection2Model.publish(payload);
    if (!errorPublish) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorPublish?.message
      };
    }
  };

  const handleStatus = async (payload) => {
    const { error: errorStatus } = await contactUsFormSection2Model.status(payload);
    if (!errorStatus) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorStatus?.message
      };
    }
  };

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await contactUsFormSection2Model.submit(formData, method);

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
    <FormContactUsSection2View
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
      onPublish={handlePublish}
      onStatus={handleStatus}
      refetch={refetch}
    />
  );
};

export default FormContactUsSection2Widget;
