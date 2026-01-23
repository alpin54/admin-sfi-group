// -- libraries
import { Row, Col, DatePicker, Badge, Avatar, List, Card, Button } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');
dayjs.extend(relativeTime);

// -- icons
import {
  AuditOutlined,
  CrownFilled,
  DoubleRightOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  GiftOutlined,
  ShopOutlined,
  UserAddOutlined
} from '@ant-design/icons';

// -- style
import style from '@components/Notification/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

const Notification = (props) => {
  const { data, loading, pagination, totalPage, dateRange, setDateRange, onPageChange } = props;
  const { RangePicker } = DatePicker;
  // range presets
  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

  const notificationHelper = (item) => {
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
            <span>{item.name}</span> placed a new order with a total of <span>{Currency.formatRp(item.total)}</span>.
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
    return { icon, title, message };
  };

  return (
    <>
      <section id='notification-section'>
        {/* Filter */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col span={8}>
            <RangePicker
              allowClear={false}
              defaultValue={[dayjs(), dayjs()]}
              format='DD MMM YYYY'
              presets={rangePresets}
              value={dateRange}
              onChange={(date) => {
                setDateRange([date ? date[0] : null, date ? date[1] : null]);
              }}
            />
          </Col>
        </Row>

        {/* List */}
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Card
              className={style.notification}
              title={
                <div className={style.notificationInfo}>
                  <p className={style.notificationTitle}>Today</p>
                  <Button type='link' icon={<DoubleRightOutlined />} size='small'>
                    Mark all as read
                  </Button>
                </div>
              }>
              <List
                dataSource={data?.unRead ?? []}
                loading={loading}
                pagination={
                  totalPage > pagination.limit && {
                    current: pagination.page,
                    pageSize: pagination.limit,
                    total: totalPage,
                    onChange: (page, pageSize) => onPageChange(page, pageSize),
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100']
                  }
                }
                renderItem={(item) => {
                  const { icon, title, message } = notificationHelper(item);
                  return (
                    <List.Item key={item.id}>
                      <Badge
                        count={item.role_id === 2 ? <CrownFilled /> : 0}
                        size='large'
                        shape='circle'
                        offset={[-4, 4]}>
                        <Avatar icon={icon} shape='circle' size={40} />
                      </Badge>
                      <div className={style.notificationText}>
                        <p className={style.notificationLabel}>
                          <span>{title}</span>
                          <span>{dayjs(item.created_at).fromNow()}</span>
                        </p>
                        <span className={style.notificationValue}>{message()}</span>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card className={`${style.notification} ${style.read}`}>
              <List
                dataSource={data?.read ?? []}
                loading={loading}
                pagination={
                  totalPage > pagination.limit && {
                    current: pagination.page,
                    pageSize: pagination.limit,
                    total: totalPage,
                    onChange: (page, pageSize) => onPageChange(page, pageSize),
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100']
                  }
                }
                renderItem={(item) => {
                  const { icon, title, message } = notificationHelper(item);
                  return (
                    <List.Item key={item.id}>
                      <Badge
                        count={item.role_id === 2 ? <CrownFilled /> : 0}
                        size='large'
                        shape='circle'
                        offset={[-4, 4]}>
                        <Avatar icon={icon} shape='circle' size={40} />
                      </Badge>
                      <div className={style.notificationText}>
                        <p className={style.notificationLabel}>
                          <span>{title}</span>
                          <span>{dayjs(item.created_at).fromNow()}</span>
                        </p>
                        <span className={style.notificationValue}>{message()}</span>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Notification;
