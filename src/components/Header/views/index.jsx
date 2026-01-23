'use client';

// -- libraries
import Image from 'next/image';
import { useRef } from 'react';
import { Avatar, Badge, Button, Col, Dropdown, Layout, Row, Space } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// -- icons
import {
  AuditOutlined,
  BellOutlined,
  CloseOutlined,
  CrownFilled,
  DoubleRightOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  GiftOutlined,
  ShopOutlined,
  UserAddOutlined
} from '@ant-design/icons';

// -- assets
import DefaultImage from '@assets/image/illustration/default-profile.png';

// -- styles
import style from '@components/Header/styles/style.module.scss';

// -- utils
import LocalStorage from '@utils/localStorage';
import Currency from '@utils/currency';

// Fungsi untuk menentukan greeting berdasarkan jam lokal

const HeaderSection = (props) => {
  const { data, notifications, total } = props;
  const { Header } = Layout;
  const user = LocalStorage.get('user');
  const headerRef = useRef(null);

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon';
    } else if (hour >= 18 && hour < 22) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  return (
    <Header className={style.header} ref={headerRef}>
      <div className={style.headerInner}>
        <h4 className={style.title}>
          {getGreeting()}, {data?.name || user?.name || 'User'}!
        </h4>
        <Space size='middle' align='center'>
          <Dropdown
            popupRender={(menu) => (
              <div className={style.dropdownContainer}>
                {/* Header */}
                <div className={style.dropdownHeader}>
                  <p className={style.dropdownTitle}>Notification</p>
                  <Button type='text' icon={<CloseOutlined />} size='small' onClick={() => headerRef.current.click()} />
                </div>
                <div className={style.dropdownInfo}>
                  <p className={style.dropdownTitle}>Today</p>
                  <Button type='link' icon={<DoubleRightOutlined />} size='small'>
                    Mark all as read
                  </Button>
                </div>

                <div className={style.dropdownBody}>{menu}</div>

                {/* Footer */}
                <div className={style.dropdownFooter}>
                  <Button variant='link' color='primary' href='/notification' size='small'>
                    View All Notification
                  </Button>
                </div>
              </div>
            )}
            menu={{
              items: notifications.map((item) => {
                const role = item.role_id === 1 ? 'Member' : 'Dealer';
                let icon;
                let title;
                let message;
                switch (item.type) {
                  case 'order':
                    icon = <ShopOutlined />;
                    title = 'New Order Received';
                    message = () => (
                      <>
                        <span>{item.name}</span> placed a new order with a total of{' '}
                        <span>{Currency.formatRp(item.total)}</span>.
                      </>
                    );
                    break;
                  case 'birthday':
                    icon = <GiftOutlined />;
                    title = `${role} Birthday`;
                    message = () => (
                      <>
                        Today is <span>{item.name}</span> birthday.
                      </>
                    );
                    break;
                  case 'registration':
                    icon = <UserAddOutlined />;
                    title = `New ${role} Registration`;
                    message = () => (
                      <>
                        New {role.toLowerCase()} <span>{item.name}</span> has registered.
                      </>
                    );
                    break;
                  case 'message':
                    icon = <FileDoneOutlined />;
                    title = 'New Message';
                    message = () => (
                      <>
                        <span>{item.name}</span> has sent a new message.
                      </>
                    );
                    break;
                  case 'uploaded':
                    icon = <FileTextOutlined />;
                    title = 'Dealer Document Uploaded';
                    message = () => (
                      <>
                        Dealer <span>{item.name}</span> has uploaded a new document for verification.”
                      </>
                    );
                    break;
                  case 'job_application':
                    icon = <AuditOutlined />;
                    title = 'New Job Application';
                    message = () => (
                      <>
                        Applicant <span>{item.name}</span> has applied for the <span>{item.position}</span> position.
                      </>
                    );
                    break;
                  default:
                    icon = <FileDoneOutlined />;
                    title = 'New Message';
                    message = () => (
                      <>
                        <span>{item.name}</span> has sent a new message.
                      </>
                    );
                }

                return {
                  key: item.id,
                  label: (
                    <Row gutter={14}>
                      <Col>
                        <Badge
                          count={item.role_id === 2 ? <CrownFilled /> : 0}
                          size='large'
                          shape='circle'
                          offset={[-4, 4]}>
                          <Avatar icon={icon} shape='circle' size={32} />
                        </Badge>
                      </Col>
                      <Col flex={1}>
                        <div className={style.dropdownText}>
                          <p className={style.dropdownLabel}>
                            <span>{title}</span>
                            <span>{dayjs(item.created_at).fromNow()}</span>
                          </p>
                          <span className={style.dropdownValue}>{message()}</span>
                        </div>
                      </Col>
                    </Row>
                  )
                };
              })
            }}
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{ padding: 0 }}
            arrow>
            <Badge count={total} overflowCount={100} size='large' shape='circle' offset={[-6, 6]}>
              <Avatar icon={<BellOutlined />} shape='circle' size={40} />
            </Badge>
          </Dropdown>
          <Avatar shape='circle' size={40}>
            <Image
              className={style.profileImg}
              src={data?.image || user?.image || DefaultImage}
              alt={data?.name || user?.name || 'user profile'}
              width={40}
              height={40}
            />
          </Avatar>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderSection;
