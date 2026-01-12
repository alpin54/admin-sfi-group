// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FAQ_ITEM
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.FAQ_ITEM,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FAQ_ITEM,
    data: payload
  });
};

const faqItemModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default faqItemModel;
