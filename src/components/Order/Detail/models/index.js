// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.ORDERS}/${id}`
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ORDERS,
    data: payload,
  });
};

const detailOrderModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default detailOrderModel;
