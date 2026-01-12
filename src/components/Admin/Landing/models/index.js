// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.USERS,
    params: params
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.USERS,
    data: {
      id
    }
  });
};

const handleSuspend = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.USERS,
    data: payload
  });
};

const adminModel = {
  list: handleList,
  delete: handleDelete,
  suspend: handleSuspend
};

export default adminModel;
