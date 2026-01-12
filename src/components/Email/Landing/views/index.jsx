// -- libraries
import { Table, Space, Tooltip, Button } from 'antd';
import { ZoomInOutlined, EditOutlined } from '@ant-design/icons';

// -- link
import Link from 'next/link';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- styles
import style from '@components/Email/Landing/styles/style.module.scss';

const EmailLandingView = (props) => {
  const { data, loading } = props;

  // Hooks
  const { canView, canEdit } = usePermission('/email');

  const dataSource = Array.isArray(data) ? data : [];

  const columns = [
    {
      title: 'Template Name',
      dataIndex: 'title',
      key: 'title',
      render: (v) => v || '-'
    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      align: 'center',
      render: (_, record) => (
        <Space>
          {canView && (
            <Link href={`/email/detail/${record.id}`}>
              <Tooltip title='Detail'>
                <Button type='text' icon={<ZoomInOutlined />} />
              </Tooltip>
            </Link>
          )}

          {canEdit && (
            <Link href={`/email/edit/${record.id}`}>
              <Tooltip title='Edit'>
                <Button type='text' icon={<EditOutlined />} />
              </Tooltip>
            </Link>
          )}
        </Space>
      )
    }
  ];

  return (
    <section className={style.menu}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        loading={loading}
        pagination={false}
        showHeader={false}
        style={{ tableLayout: 'fixed' }}
      />
    </section>
  );
};

export default EmailLandingView;
