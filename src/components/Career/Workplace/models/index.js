// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS_WORKPLACE_TYPES
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.CAREERS_WORKPLACE_TYPES,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREERS_WORKPLACE_TYPES,
    data: payload
  });
};

const workplaceModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default workplaceModel;
