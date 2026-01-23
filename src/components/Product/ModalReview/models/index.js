// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.PRODUCT_COLLECTIONS,
    data: payload
  });
};

const modalPromotionsModel = {
  submit: handleSubmit
};

export default modalPromotionsModel;
