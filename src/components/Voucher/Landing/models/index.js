// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.VOUCHERS,
    params: params
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.VOUCHERS,
    data: {
      id
    }
  });
};

const handleSuspend = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.VOUCHERS,
    data: payload
  });
};

const adminModel = {
  list: handleList,
  delete: handleDelete,
  suspend: handleSuspend
};

export default adminModel;
