// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FOOTER_MENU
  });
};

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.FOOTER_MENU,
    data: payload
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FOOTER_MENU,
    data: payload
  });
};

const aboutValuesModel = {
  single: handleSingle,
  submit: handleSubmit,
  status: handleStatus
};

export default aboutValuesModel;
