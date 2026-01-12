// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FAQ_EMPTY
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FAQ_EMPTY,
    data: payload
  });
};

const faqEmptyModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default faqEmptyModel;
