// -- libraries
import { useState } from 'react';

// -- models
import modelDealerModel from '@components/Dealer/ModalAddress/models';

// -- components
import ModalAddressView from '@components/Dealer/ModalAddress/views';

// -- data
import dummyData from '@components/Dealer/ModalAddress/data';

const ModalAddressWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (payload) => {
    // setLoading(true);
    // setMessage('');
    // try {
    //   const { data, error } = await modelDealerModel.submit(payload);
    //   if (error) {
    //     setMessage(error.message);
    //   }
    //   return data;
    // } catch (err) {
    //   const msg = err instanceof Error ? err.message : 'An unknown error occurred';
    //   setMessage(msg);
    //   return { error: msg };
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <ModalAddressView
      {...props}
      onSubmit={handleSubmit}
      loading={loading}
      message={message}
      provinceOptions={dummyData.province.data.datas}
      cityOptions={dummyData.city.data.datas}
      districtOptions={dummyData.district.data.datas}
      subdistrictOptions={dummyData.subdistrict.data.results}
    />
  );
};

export default ModalAddressWidget;
