// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formVoucherModel from '@components/Dealer/Voucher/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import VoucherFormView from '@components/Dealer/Voucher/Form/views';

// -- data
import dummyData from '@components/Dealer/Voucher/Form/data';

const VoucherFormWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch Voucher data if slug exists
  // const { data, refetch } = useFirstLoad(
  //   useCallback(() => (props.slug ? formVoucherModel.single(props.slug) : []), [props.slug])
  // );

  // handle submit
  const handleSubmit = async (payload, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await formVoucherModel.submit(payload, method);

      if (error) {
        setMessage(error.message);
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
    <VoucherFormView
      slug={props.slug ?? null}
      action={props.action ?? null}
      data={dummyData?.data ?? null}
      loading={loading}
      message={message}
      refetch={() => {}}
      onSubmit={handleSubmit}
    />
  );
};

export default VoucherFormWidget;
