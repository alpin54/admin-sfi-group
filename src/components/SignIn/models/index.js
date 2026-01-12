// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.LOGIN,
    data: payload
  });
};

const handleList = async (role_id, token) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.ROLEMENU}/${role_id}`,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
};

const SignInModel = {
  submit: handleSubmit,
  list: handleList
};

export default SignInModel;
