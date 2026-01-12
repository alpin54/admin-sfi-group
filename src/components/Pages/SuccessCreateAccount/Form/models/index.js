// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SUCCESSCREATETEXT
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SUCCESSCREATETEXT,
    data: payload
  });
};

const successCreateAccountFormModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default successCreateAccountFormModel;
