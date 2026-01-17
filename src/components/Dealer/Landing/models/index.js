// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.MEMBER,
    params: params
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.MEMBER,
    data: {
      id
    }
  });
};

const handleSuspend = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.MEMBER,
    data: payload
  });
};

const memberModel = {
  list: handleList,
  delete: handleDelete,
  suspend: handleSuspend
};

export default memberModel;
