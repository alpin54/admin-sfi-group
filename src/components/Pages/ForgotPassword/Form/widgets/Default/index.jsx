// -- libraries
import { useState, useCallback } from 'react';

// -- models
import forgotPasswordModel from '@components/Pages/ForgotPassword/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormForgotPasswordView from '@components/Pages/ForgotPassword/Form/views';

// -- dummy
import dummyData from '@components/Pages/ForgotPassword/Form/data';

const FormForgotPasswordWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => forgotPasswordModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await forgotPasswordModel.submit(formData, method);
      // if (error) {
      //   setMessage(error.message);
      // }
      // return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormForgotPasswordView {...props} data={dummyData} loading={loading} message={message} onSubmit={handleSubmit} />
  );
};

export default FormForgotPasswordWidget;
