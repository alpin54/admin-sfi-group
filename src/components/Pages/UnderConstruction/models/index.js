// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.MAINTENANCE
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.MAINTENANCE,
    data: payload
  });
};

const underConstructionModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default underConstructionModel;
