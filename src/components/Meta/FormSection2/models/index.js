// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.META
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.META,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const metaModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default metaModel;
