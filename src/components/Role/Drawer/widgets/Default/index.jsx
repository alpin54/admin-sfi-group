// -- libraries
import { useState, useCallback } from 'react';

// -- models
import drawerRoleModel from '@components/Role/Drawer/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import RoleDrawerView from '@components/Role/Drawer/views';

// -- data
import permissionOptions from '@components/Role/Drawer/data/permissionOptions';

const RoleDrawerWidget = (props) => {
  const { roleId, accessOptions } = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready } = useFirstLoad(useCallback(() => (roleId ? drawerRoleModel.single(roleId) : []), [roleId]));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await drawerRoleModel.submit(formData, method);

      if (error) {
        setMessage(error.message);
      }

      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleDrawerView
      {...props}
      data={data?.data ?? null}
      permissionOptions={permissionOptions}
      accessOptions={accessOptions ?? []}
      onSubmit={handleSubmit}
      ready={!ready}
      loading={loading}
      message={message}
    />
  );
};

export default RoleDrawerWidget;
