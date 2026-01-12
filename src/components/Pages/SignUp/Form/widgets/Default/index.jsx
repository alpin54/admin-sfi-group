// -- libraries
import { useState, useCallback } from 'react';

// -- models
import signUpFormModel from '@components/Pages/SignUp/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormSignUpView from '@components/Pages/SignUp/Form/views';

// -- data
import data from '@components/Pages/SignUp/Form/data';

const FormSignUpWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch form data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => signUpFormModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await signUpFormModel.submit(formData, method);
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
    <FormSignUpView {...props} data={data} ready={true} loading={loading} message={message} onSubmit={handleSubmit} />
  );
};

export default FormSignUpWidget;
