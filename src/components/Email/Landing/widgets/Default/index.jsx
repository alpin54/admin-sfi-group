// -- libraries
import { useState, useEffect } from 'react';

// -- models
import emailLandingModel from '@components/Email/Landing/models';

// -- components
import EmailLandingView from '@components/Email/Landing/views';

const EmailLandingWidget = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await emailLandingModel.list();
      setData(response?.data?.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <EmailLandingView data={data} loading={loading} />;
};

export default EmailLandingWidget;
