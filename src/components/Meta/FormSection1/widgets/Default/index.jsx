// -- libraries
import { useState, useCallback } from 'react';

// -- models
import metaModel from '@components/Meta/FormSection1/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormMetaSection1View from '@components/Meta/FormSection1/views';

// -- data
import data from '@components/Meta/FormSection1/data';

const FormMetaSection1Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => metaModel.single(), []));

  const handleSave = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await metaModel.submit(formData, method);

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
    <FormMetaSection1View
      {...props}
      data={data}
      ready={false}
      onSubmit={handleSave}
      loading={loading}
      message={message}
    />
  );
};

export default FormMetaSection1Widget;
