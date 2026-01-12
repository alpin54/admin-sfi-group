// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (role_id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.ROLEMENU}/${role_id}`
  });
};

const sidebarModel = {
  list: handleList
};

export default sidebarModel;
