// -- libraries
import { useState } from 'react';

// -- models
import modalItemModel from '@components/Pages/Faq/ModalItem/models';

// -- components
import ModalItemView from '@components/Pages/Faq/ModalItem/views';

const ModalItemWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalItemModel.submit(formData, method);

  //     if (error) {
  //       setMessage(error.message);
  //     }

  //     return data;
  //   } catch (err) {
  //     const msg = err instanceof Error ? err.message : 'An unknown error occurred';
  //     setMessage(msg);
  //     return { error: msg };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // return <ModalItemView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
  return <ModalItemView {...props} />;
};

export default ModalItemWidget;
