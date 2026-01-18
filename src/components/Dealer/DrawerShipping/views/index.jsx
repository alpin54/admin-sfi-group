// -- libraries
import { useCallback, useMemo } from 'react';
import { Drawer, Tag, Typography, Button, Tooltip } from 'antd';

// -- icons
import {
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  AimOutlined,
  CheckOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  WarningOutlined
} from '@ant-design/icons';

// -- styles
import style from '@components/Dealer/DrawerShipping/styles/style.module.scss';

// -- utils
import LocalStorage from '@utils/localStorage';

const { Text } = Typography;

// Address meta row utility
const MetaRow = ({ icon, children }) => (
  <div className={style.metaRow}>
    <div className={style.metaIcon}>{icon}</div>
    <div className={style.metaText}>{children}</div>
  </div>
);

// Address card, with default indicator and selector
const AddressCard = ({ item, isDefault, onSelectDefault, handleDelete, handleStatus, handleAddress }) => (
  <div className={style.addressCard} role='group' aria-label={`address-${item.id}`}>
    <div className={style.addressHeader}>
      <Tag className={style.labelTag} color='warning' icon={<AimOutlined />}>
        {item.label}
      </Tag>
      {isDefault && (
        <Tag className={style.labelTag} color='success' icon={<CheckCircleOutlined />}>
          Default
        </Tag>
      )}
    </div>

    <div className={style.addressAction}>
      <Tooltip title='Set as default' placement='left'>
        <Button
          variant='text'
          color={isDefault ? 'primary' : 'default'}
          icon={<CheckOutlined />}
          size='small'
          onClick={() => onSelectDefault(item.id)}
        />
      </Tooltip>
      <Tooltip title='Edit' placement='left'>
        <Button type='text' icon={<EditOutlined />} size='small' onClick={() => handleAddress(item)} />
      </Tooltip>
      <Tooltip title='Hide' placement='left'>
        <Button type='text' icon={<EyeInvisibleOutlined />} size='small' onClick={() => handleStatus(item)} />
      </Tooltip>
      <Tooltip title='Delete' placement='left'>
        <Button type='text' icon={<DeleteOutlined />} size='small' onClick={() => handleDelete(item)} />
      </Tooltip>
    </div>

    <div className={style.addressBody}>
      <MetaRow icon={<UserOutlined className={style.icon} />}>
        <Text strong>{item.name}</Text>
      </MetaRow>

      <MetaRow icon={<PhoneOutlined className={style.icon} />}>
        <Text>{item.phone}</Text>
      </MetaRow>

      <MetaRow icon={<EnvironmentOutlined className={style.icon} />}>
        <Text className={style.addressText}>
          {item.province_name}, {item.city_name}, {item.district_name}, {item.subdistrict_name}, {item.postal_code},{' '}
          {item.address}
        </Text>
      </MetaRow>
    </div>
  </div>
);

const DetailDealerDrawer = (props) => {
  const { open, onClose, openAddress, data, defaultAddressId, onSelectDefault, onDelete, onStatus, notify, confirm } =
    props;
  const user = LocalStorage.get('user');
  // Pilih addresses dari inisialisasi/default
  const addresses = useMemo(() => {
    if (data?.addresses && Array.isArray(data.addresses)) {
      return data.addresses;
    }
    if (data?.address && Array.isArray(data.address)) {
      return data.address;
    }
  }, [data]);

  // Default addressId diambil dari prop atau fallback ke address pertama
  const selectedDefaultId =
    defaultAddressId ||
    (addresses.length > 0 ? addresses.find((addr) => addr.is_default)?.id || addresses[0].id : null);

  // Handler saat user memilih default address (pass ke parent)
  const handleSelectDefault = (id) => {
    if (id !== selectedDefaultId && typeof onSelectDefault === 'function') {
      onSelectDefault(id);
    }
  };

  const handleDelete = useCallback(
    (record) => {
      confirm({
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${record.label}?`,
        onSuccess: async () => {
          const response = await onDelete(record.id);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: 'Data deleted successfully'
            });
          } else {
            notify({
              type: 'error',
              message: response.error || 'Failed to delete data'
            });
          }
        }
      });
    },
    [confirm, notify, onDelete]
  );

  const handleStatus = useCallback(
    (record) => {
      const title = record.status ? 'Hide' : 'Unhide';
      const status = record.status ? 0 : 1;
      const payload = { id: record.id, status: status, updated_by: user.id };

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.label}?`,
        onSuccess: async () => {
          const response = await onStatus(payload);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Data ${title.toLowerCase()} successfully`
            });
          } else {
            notify({
              type: 'error',
              message: response.error || `Failed to ${title.toLowerCase()} data`
            });
          }
        }
      });
    },
    [notify, confirm, onStatus, user]
  );

  const handleAddress = (data) => {
    if (typeof openAddress === 'function') {
      console.log('data', data);
      openAddress(data);
    }
  };

  return (
    <Drawer title='Shipping' width={684} open={open} onClose={onClose} closable={true} className='drawer-form'>
      <div className={style.drawerContent}>
        {addresses.length === 0 ? (
          <div className={style.empty}>No shipping addresses found.</div>
        ) : (
          addresses.map((addr) => (
            <AddressCard
              item={addr}
              key={addr.id}
              isDefault={selectedDefaultId === addr.id}
              onSelectDefault={handleSelectDefault}
              handleDelete={handleDelete}
              handleStatus={handleStatus}
              handleAddress={handleAddress}
            />
          ))
        )}
      </div>
    </Drawer>
  );
};

export default DetailDealerDrawer;
