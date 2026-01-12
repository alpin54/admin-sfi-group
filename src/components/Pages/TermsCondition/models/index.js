// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.TERMS_CONDITIONS
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.TERMS_CONDITIONS,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.TERMS_CONDITIONS,
    data: payload
  });
};

const termsConditionModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default termsConditionModel;
