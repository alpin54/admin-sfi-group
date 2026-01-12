// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SHIPPING_RETURN
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SHIPPING_RETURN,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SHIPPING_RETURN,
    data: payload
  });
};

const shippingReturnModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default shippingReturnModel;
