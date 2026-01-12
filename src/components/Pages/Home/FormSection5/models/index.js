// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HOME_HIGHLIGHTS
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_HIGHLIGHTS_SECTION,
    data: payload
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_HIGHLIGHTS,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const formSection5Model = {
  list: handleList,
  publish: handlePublish,
  status: handleStatus
};

export default formSection5Model;
