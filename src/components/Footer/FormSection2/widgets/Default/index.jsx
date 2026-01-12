// -- libraries
import { useState, useCallback } from 'react';

// -- models
import footerSection2Model from '@components/Footer/FormSection2/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormFooterSection2View from '@components/Footer/FormSection2/views';

const FormFooterSection2Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => footerSection2Model.single(), []));

  // Handle Status then refetch
  const handleStatus = async (payload) => {
    const { error: errorStatus } = await footerSection2Model.status(payload);
    if (!errorStatus) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorStatus?.messag
      };
    }
  };

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await footerSection2Model.submitForm(formData, method);

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
    <FormFooterSection2View
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

export default FormFooterSection2Widget;
