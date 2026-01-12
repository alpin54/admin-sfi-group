// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.CUSTOMERS}/${id}`
  });
};

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.CUSTOMERS,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const modalCustomerModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default modalCustomerModel;
