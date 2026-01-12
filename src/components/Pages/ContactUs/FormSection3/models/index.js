// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CONTACT_US_FORM
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CONTACT_US_FORM,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CONTACT_US_FORM,
    data: payload
  });
};

const contactUsFormModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default contactUsFormModel;
