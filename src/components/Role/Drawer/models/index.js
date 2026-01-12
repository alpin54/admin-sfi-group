// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async (role_id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.ROLES}/${role_id}`
  });
};

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.ROLES,
    data: payload
  });
};

const drawerRoleModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default drawerRoleModel;
