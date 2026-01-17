// --library
import React, { useMemo } from 'react';
import { Drawer, Tag, Typography, Button } from 'antd';
import { CloseOutlined, UserOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
// --styles
import style from '@components/Dealer/Drawer/styles/style.module.scss';

const { Text } = Typography;

const DEFAULT_ADDRESSES = [
  {
    id: 'a1',
    label: 'Kantor',
    name: 'Michael Rodri',
    phone: '+62 2122 5711 25',
    address: 'West Java, Bandung, Bandung Wetan, Cibeunying Kaler, Jl. Setiabudi No. 123, 40141'
  },
  {
    id: 'a2',
    label: 'Kantor',
    name: 'Michael Rodri',
    phone: '+62 2122 5711 25',
    address: 'West Java, Bandung, Bandung Wetan, Cibeunying Kaler, Jl. Setiabudi No. 123, 40141'
  }
];

const MetaRow = ({ icon, children }) => (
  <div className={style.metaRow}>
    <div className={style.metaIcon}>{icon}</div>
    <div className={style.metaText}>{children}</div>
  </div>
);

const AddressCard = ({ item }) => (
  <div className={style.addressCard} role='group' aria-label={`address-${item.id}`}>
    <div className={style.addressHeader}>
      <Tag className={style.labelTag} color='warning' icon={<EnvironmentOutlined />}>
        {item.label}
      </Tag>
    </div>

    <div className={style.addressBody}>
      <MetaRow icon={<UserOutlined className={style.icon} />}>
        <Text strong>{item.name}</Text>
      </MetaRow>

      <MetaRow icon={<PhoneOutlined className={style.icon} />}>
        <Text>{item.phone}</Text>
      </MetaRow>

      <MetaRow icon={<EnvironmentOutlined className={style.icon} />}>
        <Text className={style.addressText}>{item.address}</Text>
      </MetaRow>
    </div>
  </div>
);

const DetailDealerDrawer = ({ open = false, onClose = () => {}, initialValues = {} }) => {
  const addresses = useMemo(() => {
    // support both initialValues.addresses or initialValues.address or addresses prop
    if (initialValues?.addresses && Array.isArray(initialValues.addresses)) {
      return initialValues.addresses;
    }
    if (initialValues?.address && Array.isArray(initialValues.address)) {
      return initialValues.address;
    }
    return DEFAULT_ADDRESSES;
  }, [initialValues]);

  return (
    <Drawer title='Shipping' width={684} open={open} onClose={onClose} closable={true} className='drawer-form'>
      <div className={style.drawerContent}>
        {addresses.length === 0 ? (
          <div className={style.empty}>No shipping addresses found.</div>
        ) : (
          addresses.map((addr) => <AddressCard item={addr} key={addr.id} />)
        )}

        {/* optional footer area (kept empty in design) */}
        <div style={{ height: 32 }} />
      </div>
    </Drawer>
  );
};

export default DetailDealerDrawer;
