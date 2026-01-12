// --library
import { useState, useCallback } from 'react';

// -- models
import verificationEmailDealerFormModel from '@components/Pages/VerificationEmailDealer/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormVerificationEmailDealerView from '@components/Pages/VerificationEmailDealer/Form/views';

// -- data
import dummyData from '@components/Pages/VerificationEmailDealer/Form/data';

const FormVerificationEmailDealerWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => verificationEmailDealerFormModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await verificationEmailDealerFormModel.submit(formData, method);
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
    <FormVerificationEmailDealerView
      {...props}
      data={dummyData}
      ready={true}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormVerificationEmailDealerWidget;
