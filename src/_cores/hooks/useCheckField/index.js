/* eslint-disable */

import { useWatch } from 'antd/es/form/Form';

const useCheckField = (form, fieldName) => {
  const value = useWatch(fieldName, form);
  return value !== undefined && value !== null && value !== '';
};

export default useCheckField;
