// -- libraries
import { useState } from 'react';

// -- models
import modalBrandModel from '@components/Product/ModalBrand/models';

// -- components
import BrandModalView from '@components/Product/ModalBrand/views';

const BrandModalWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (formData, method, type) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await modalBrandModel.submit(formData, method, type);

      // if (error) {
      //   setMessage(error.message);
      // }

      // return data;
      return {};
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return <BrandModalView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default BrandModalWidget;
