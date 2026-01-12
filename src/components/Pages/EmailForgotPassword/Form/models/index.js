// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SENDINSTRUCTIONSTEXT
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SENDINSTRUCTIONSTEXT,
    data: payload
  });
};

const newPasswordModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default newPasswordModel;
