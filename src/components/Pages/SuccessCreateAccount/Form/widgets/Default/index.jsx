// --library
import { useState, useCallback } from 'react';

// -- models
import successCreateAccountFormModel from '@components/Pages/SuccessCreateAccount/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormSuccessCreateAccountView from '@components/Pages/SuccessCreateAccount/Form/views';

const FormSuccessCreateAccountWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => successCreateAccountFormModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await successCreateAccountFormModel.submit(formData, method);

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
    <FormSuccessCreateAccountView
      {...props}
      data={data?.data}
      ready={ready}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormSuccessCreateAccountWidget;
