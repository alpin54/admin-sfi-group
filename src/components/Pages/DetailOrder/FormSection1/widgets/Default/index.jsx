// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formDetailOrderSection1Model from '@components/Pages/DetailOrder/FormSection1/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormDetailOrderSection1View from '@components/Pages/DetailOrder/FormSection1/views';

// -- data
import data from '@components/Pages/DetailOrder/FormSection1/data';

const FormDetailOrderSection1Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => formDetailOrderSection1Model.single(), []));

  // Handle publish then refetch

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await formDetailOrderSection1Model.submit(formData, method);

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
    <FormDetailOrderSection1View
      {...props}
      data={data}
      ready={false}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormDetailOrderSection1Widget;
