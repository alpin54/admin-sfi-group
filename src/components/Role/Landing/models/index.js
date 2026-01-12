// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ROLES,
    params: params
  });
};

const handleMenuList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ROLEMENU
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.ROLES,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ROLES,
    data: payload
  });
};

const roleModel = {
  list: handleList,
  menuList: handleMenuList,
  delete: handleDelete,
  status: handleStatus
};

export default roleModel;
