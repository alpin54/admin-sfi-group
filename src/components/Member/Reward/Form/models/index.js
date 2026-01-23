// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SIGNINTEXT
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SIGNINTEXT,
    data: payload
  });
};

const signInModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default signInModel;
