// --library
import { useState, useCallback } from 'react';

// -- models
import emailForgotPasswordModel from '@components/Pages/EmailForgotPassword/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormEmailForgotPasswordView from '@components/Pages/EmailForgotPassword/Form/views';

// -- data
import dummyData from '@components/Pages/EmailForgotPassword/Form/data';

const FormEmailForgotPasswordWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => emailForgotPasswordModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await emailForgotPasswordModel.submit(formData, method);
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
    <FormEmailForgotPasswordView
      {...props}
      data={dummyData}
      ready={true}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormEmailForgotPasswordWidget;
