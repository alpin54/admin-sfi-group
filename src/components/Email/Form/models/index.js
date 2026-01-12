// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const HandleSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.EMAIL_TEMPLATE}/${id}`
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.EMAIL_TEMPLATE,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const formEmailModel = {
  single: HandleSingle,
  submit: handleSubmit
};

export default formEmailModel;
