// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HOME_FEATURED_PRODUCTS
  });
};

const handleProduct = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCTS
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_FEATURED_PRODUCTS_SECTION,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.HOME_FEATURED_PRODUCTS,
    data: payload
  });
};

const handleSubmitSection = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_FEATURED_PRODUCTS_SECTION,
    data: payload
  });
};

const formSection3Model = {
  list: handleList,
  product: handleProduct,
  publish: handlePublish,
  submit: handleSubmit,
  submitSection: handleSubmitSection
};

export default formSection3Model;
