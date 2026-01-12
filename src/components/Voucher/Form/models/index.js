// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleVoucherSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.VOUCHERS}/${id}`
  });
};

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.VOUCHERS,
    data: payload
  });
};

const formVoucherModel = {
  single: handleVoucherSingle,
  submit: handleSubmit
};

export default formVoucherModel;
