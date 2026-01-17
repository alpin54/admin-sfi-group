// --library
import { useState } from 'react';

// -- models
import modalImageModel from '@components/Pages/Career/ModalRecruitment/models';

// -- components
import ModalRecruitmentCareerView from '@components/Pages/Career/ModalRecruitment/views';

const CareerModalRecruitmentWidget = (props) => {
  // const [loading, setLoading] = useState();
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalImageModel.submit(formData, method);

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
  // return <ModalRecruitmentCareerView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
  return <ModalRecruitmentCareerView {...props} />;
};

export default CareerModalRecruitmentWidget;
