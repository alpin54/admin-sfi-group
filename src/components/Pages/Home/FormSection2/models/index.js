// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HOME_FEATURED_CATEGORIES
  });
};

const handleProductCategory = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_CATEGORIES
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_FEATURED_CATEGORIES_SECTION,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.HOME_FEATURED_CATEGORIES,
    data: payload
  });
};

const formSection2Model = {
  list: handleList,
  productCategory: handleProductCategory,
  publish: handlePublish,
  submit: handleSubmit
};

export default formSection2Model;
