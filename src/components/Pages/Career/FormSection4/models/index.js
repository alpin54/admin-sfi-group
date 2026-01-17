// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREER_EMPTY
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREER_EMPTY,
    data: payload
  });
};

const careerEmptyModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default careerEmptyModel;
