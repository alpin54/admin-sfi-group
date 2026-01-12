// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.NOTFOUND
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.NOTFOUND,
    data: payload
  });
};

const notFoundModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default notFoundModel;
