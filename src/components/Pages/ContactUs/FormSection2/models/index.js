// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CONTACT_US
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CONTACT_US,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CONTACT_US,
    data: payload
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CONTACT_US_ITEM,
    data: payload
  });
};

const contactUsFormSection2Model = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit,
  status: handleStatus
};

export default contactUsFormSection2Model;
