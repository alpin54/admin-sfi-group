// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORGOTTEXT
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FORGOTTEXT,
    data: payload
  });
};

const forgotPasswordModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default forgotPasswordModel;
