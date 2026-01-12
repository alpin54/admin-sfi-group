// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FOOTER
  });
};

const handleSubmitForm = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FOOTER,
    data: payload
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FOOTER_SOSMED,
    data: payload
  });
};

const footerSection2Model = {
  single: handleSingle,
  submitForm: handleSubmitForm,
  status: handleStatus
};

export default footerSection2Model;
