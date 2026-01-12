// --library
import { useState, useCallback } from 'react';

// -- models
import successUploadDocumentFormModel from '@components/Pages/SuccessUploadDocument/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormSuccessUploadDocumentView from '@components/Pages/SuccessUploadDocument/Form/views';

// -- data
import dummyData from '@components/Pages/SuccessUploadDocument/Form/data';

const FormSuccessUploadDocumentWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => successUploadDocumentFormModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await successUploadDocumentFormModel.submit(formData, method);
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
    <FormSuccessUploadDocumentView
      {...props}
      data={dummyData}
      ready={true}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormSuccessUploadDocumentWidget;
