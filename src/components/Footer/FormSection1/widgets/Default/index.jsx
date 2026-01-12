// -- libraries
import { useState, useCallback } from 'react';

// -- models
import footerSection1Model from '@components/Footer/FormSection1/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormFooterSection1View from '@components/Footer/FormSection1/views';

// -- data
import data from '@components/Footer/FormSection1/data';

const FormFooterSection1Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => footerSection1Model.single(), []));

  // Handle Status then refetch
  const handleStatus = async (payload) => {
    const { error: errorStatus } = await footerSection1Model.status(payload);
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
      const { data, error } = await footerSection1Model.submit(formData, method);

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
    <FormFooterSection1View
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      onStatus={handleStatus}
      onSubmit={handleSubmit}
      refetch={refetch}
    />
  );
};

export default FormFooterSection1Widget;
