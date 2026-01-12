// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.PRODUCT_MATERIALS,
    data: payload
  });
};

const modalMaterialModel = {
  submit: handleSubmit
};

export default modalMaterialModel;
