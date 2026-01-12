// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleListData = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SUBSCRIBE,
    params: params
  });
};

const handleListSummary = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SUBSCRIBE_SUMMARY,
    params: params
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.SUBSCRIBE,
    data: {
      id
    }
  });
};

const handleDownload = () => {
  return ENDPOINT.SUBSCRIBE_DOWNLOAD;
};

const memberModel = {
  listData: handleListData,
  listSummary: handleListSummary,
  delete: handleDelete,
  download: handleDownload
};

export default memberModel;
