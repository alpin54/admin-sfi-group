// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SIGNUPTEXT
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SIGNUPTEXT,
    data: payload
  });
};

const signUpFormModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default signUpFormModel;
