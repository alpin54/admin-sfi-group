// --library
import { useState } from 'react';

// -- models
import modalImageModel from '@components/Pages/AboutUs/ModalBranches/models';

// -- components
import ModalAboutUsBranchesView from '@components/Pages/AboutUs/ModalBranches/views';

const AboutUsModalBranchesWidget = (props) => {
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
  // return <ModalAboutUsBranchesView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
  return <ModalAboutUsBranchesView {...props} />;
};

export default AboutUsModalBranchesWidget;
