// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (formData, method, type) => {
  return await httpRequest({
    method: method,
    url: type === 'category' ? ENDPOINT.PRODUCT_CATEGORIES : ENDPOINT.PRODUCT_SUB_CATEGORIES,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const modalCategoryModel = {
  submit: handleSubmit
};

export default modalCategoryModel;
