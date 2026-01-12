// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS_JOB_TYPE
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.CAREERS_JOB_TYPE,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREERS_JOB_TYPE,
    data: payload
  });
};

const jobTypeModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default jobTypeModel;
