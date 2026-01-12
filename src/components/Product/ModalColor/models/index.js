// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.PRODUCT_COLORS,
    data: payload
  });
};

const modalColorModel = {
  submit: handleSubmit
};

export default modalColorModel;
