// -- libraries
import { useState } from 'react';

// -- models
import modelMemberModel from '@components/Member/ModalAddress/models';

// -- components
import ModalAddressView from '@components/Member/ModalAddress/views';

// -- data
import dummyData from '@components/Member/ModalAddress/data';

const ModalAddressWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (payload) => {
    // setLoading(true);
    // setMessage('');
    // try {
    //   const { data, error } = await modelMemberModel.submit(payload);
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
