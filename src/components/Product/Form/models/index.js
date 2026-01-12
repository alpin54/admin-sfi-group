// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleProductSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.PRODUCTS}/${id}`
  });
};

const handleCategoryList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_CATEGORIES_TREE,
    param: {
      status: 1
    }
  });
};

const handleCollectionList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_COLLECTIONS,
    param: {
      status: 1
    }
  });
};

const handleMaterialList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_MATERIALS,
    param: {
      status: 1
    }
  });
};

const handleColorList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_COLORS,
    param: {
      status: 1
    }
  });
};

const handleSizeList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_SIZES,
    param: {
      status: 1
    }
  });
};

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.PRODUCTS,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const formProductModel = {
  single: handleProductSingle,
  categoryList: handleCategoryList,
  collectionList: handleCollectionList,
  materialList: handleMaterialList,
  colorList: handleColorList,
  sizeList: handleSizeList,
  submit: handleSubmit
};

export default formProductModel;
