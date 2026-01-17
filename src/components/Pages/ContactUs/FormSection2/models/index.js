// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CONTACT_US_INFO
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CONTACT_US_INFO,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CONTACT_US_INFO,
    data: payload
  });
};

const contactUsInfoModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default contactUsInfoModel;
