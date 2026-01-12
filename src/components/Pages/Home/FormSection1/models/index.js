// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HOME_BANNER
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_BANNER_SECTION,
    data: payload
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_BANNER,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.HOME_BANNER,
    data: {
      id
    }
  });
};

const formSection1Model = {
  list: handleList,
  publish: handlePublish,
  status: handleStatus,
  delete: handleDelete
};

export default formSection1Model;
