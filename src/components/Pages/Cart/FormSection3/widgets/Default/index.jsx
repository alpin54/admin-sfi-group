// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formCartSection2Model from '@components/Pages/Cart/FormSection3/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormCartSection3View from '@components/Pages/Cart/FormSection3/views';

// -- data
import data from '@components/Pages/Cart/FormSection3/data';

const FormCartSection3Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => formCartSection2Model.single(), []));

  // Handle publish then refetch

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await formCartSection2Model.submit(formData, method);

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
    <FormCartSection3View
      {...props}
      data={data}
      ready={false}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormCartSection3Widget;
