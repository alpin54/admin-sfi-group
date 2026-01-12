// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HOME_SECTION_IMAGE
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_SECTION_IMAGE,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_SECTION_IMAGE,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const formSection1Model = {
  list: handleList,
  publish: handlePublish,
  submit: handleSubmit
};

export default formSection1Model;
