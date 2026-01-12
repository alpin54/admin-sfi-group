// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formMetaSection3Model from '@components/Meta/FormSection3/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormMetaSection3View from '@components/Meta/FormSection3/views';

const FormMetaSection3Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formMetaSection3Model.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await formMetaSection3Model.submit(formData, method);

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
    <FormMetaSection3View
      {...props}
      data={data?.data}
      ready={ready}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormMetaSection3Widget;
