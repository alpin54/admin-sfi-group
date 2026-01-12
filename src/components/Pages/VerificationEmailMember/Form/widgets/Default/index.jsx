// --library
import { useState, useCallback } from 'react';

// -- models
import verificationEmailMemberFormModel from '@components/Pages/VerificationEmailMember/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormVerificationEmailMemberView from '@components/Pages/VerificationEmailMember/Form/views';

// -- data
import dummyData from '@components/Pages/VerificationEmailMember/Form/data';

const FormVerificationEmailMemberWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => verificationEmailMemberFormModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await verificationEmailMemberFormModel.submit(formData, method);
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
    <FormVerificationEmailMemberView
      {...props}
      data={dummyData}
      ready={true}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormVerificationEmailMemberWidget;
