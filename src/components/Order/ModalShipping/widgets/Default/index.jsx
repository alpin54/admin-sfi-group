// -- libraries
import { useState } from 'react';

// -- models
import modalShippingModel from '@components/Order/ModalShipping/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import ModalShippingView from '@components/Order/ModalShipping/views';

// -- data
import shipping from '@components/Order/ModalShipping/data';

const ModalShippingWidget = (props) => {
  return <ModalShippingView {...props} shipping={shipping} loading={false} />;
};

export default ModalShippingWidget;
