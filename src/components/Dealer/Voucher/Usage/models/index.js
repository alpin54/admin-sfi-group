// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleVoucherList = async (id, params) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.VOUCHERS_USAGE}/${id}`,
    params: params
  });
};

const voucherUsageModel = {
  list: handleVoucherList
};

export default voucherUsageModel;
