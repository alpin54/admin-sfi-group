// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formTermsConditionsSection1Model from '@components/Pages/TermsConditions/FormSection1/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormTermsConditionsSection1View from '@components/Pages/TermsConditions/FormSection1/views';

// -- data
import data from '@components/Pages/TermsConditions/FormSection1/data';

const FormTermsConditionsSection1Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => formTermsConditionsSection1Model.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    // const { error: errorPublish } = await formTermsConditionsSection1Model.publish(payload);
    // if (!errorPublish) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorPublish?.message
    //   };
    // }
  };

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await formTermsConditionsSection1Model.submit(formData, method);

      // if (error) {
      //   setMessage(error.message);
      // }

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
    <FormTermsConditionsSection1View
      {...props}
      data={data}
      ready={false}
      loading={loading}
      message={message}
      onPublish={handlePublish}
      onSubmit={handleSubmit}
    />
  );
};

export default FormTermsConditionsSection1Widget;
