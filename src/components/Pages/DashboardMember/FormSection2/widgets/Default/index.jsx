// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formDashboardMemberSection2Model from '@components/Pages/DashboardMember/FormSection2/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormDashboardMemberSection2View from '@components/Pages/DashboardMember/FormSection2/views';

// -- data
import data from '@components/Pages/DashboardMember/FormSection2/data';

const FormDashboardMemberSection2Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => formDashboardMemberSection2Model.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    // const { error: errorPublish } = await formDashboardMemberSection2Model.publish(payload);
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
      // const { data, error } = await formDashboardMemberSection2Model.submit(formData, method);

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
    <FormDashboardMemberSection2View
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

export default FormDashboardMemberSection2Widget;
