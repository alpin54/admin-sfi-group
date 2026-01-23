// -- libraries
import { useState, useCallback, useMemo } from 'react';
import { Button, Table, Tooltip, Breadcrumb, Form, Space } from 'antd';

// -- icons
import { EditOutlined, EyeInvisibleOutlined, EyeOutlined, WarningOutlined } from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import LocalStorage from '@utils/localStorage';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';
import ModalMenu from '@components/Menu/ModalMenu/widgets/Default';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

// -- styles
import style from '@components/Menu/Landing/styles/style.module.scss';

const MenuLandingView = (props) => {
  const { data, loading, totalPage, pagination, onStatus, onPageChange, refetch } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [lang, setLang] = useState('en');
  const [isEdit, setIsEdit] = useState(false);

  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  // Show modal add/edit
  const handleShowModal = useCallback(
    (item) => {
      formInstance.resetFields();
      setMethod('edit');
      setDataForm(item);
      setOpen(true);
    },
    [formInstance]
  );

  const handleCloseModal = useCallback(() => {
    formInstance.resetFields();
    setDataForm(undefined);
    setOpen(false);
  }, [formInstance]);

  // Status handler
  const handleStatus = useCallback(
    (item) => {
      const title = item.status ? 'Hide' : 'Unhide';
      const status = item.status ? false : true;
      const payload = { id: item.id, status, updated_by: user.id };
      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${item.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(payload);
          if (response && !response.error) {
            notify({ type: 'success', message: `Data ${title.toLowerCase()} successfully` });
            refetch?.();
          } else {
            notify({ type: 'error', message: response?.error || `Failed to ${title.toLowerCase()} data` });
          }
        }
      });
    },
    [confirm, notify, onStatus, user, refetch]
  );

  // Table columns
  const dataColumns = useMemo(() => {
    const cols = [
      {
        title: 'Title',
        key: 'title',
        render: (_, record) => record.title?.[lang] || '-'
      }
    ];

    if (isEdit) {
      cols.push({
        title: 'Actions',
        key: 'actions',
        align: 'center',
        width: 160,
        render: (_, record) => (
          <Space>
            <Tooltip title={record.status ? 'Hide' : 'Unhide'}>
              <Button
                size='small'
                type='text'
                icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => handleStatus(record)}
              />
            </Tooltip>
            <Tooltip title='Edit'>
              <Button size='small' type='text' icon={<EditOutlined />} onClick={() => handleShowModal(record)} />
            </Tooltip>
          </Space>
        )
      });
    }
    return cols;
  }, [isEdit, handleStatus, handleShowModal, lang]);

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section className={style.menu}>
        <TranslationTabs value={lang} onChange={setLang} />
        <Table
          columns={dataColumns}
          dataSource={Array.isArray(data) ? data : []}
          rowKey='id'
          loading={loading}
          pagination={false}
        />

        <div>
          {isEdit ? (
            <Space>
              <Button type='default' onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
              <Button
                type='primary'
                onClick={() => {
                  /* TODO: handleSave jika perlu */
                }}>
                Save
              </Button>
            </Space>
          ) : (
            <Button type='primary' onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
        </div>
      </section>

      {/* Modal */}
      {open && (
        <ModalMenu
          open={open}
          onClose={handleCloseModal}
          method='edit'
          initialValues={dataForm}
          formInstance={formInstance}
          notify={notify}
          refetch={refetch}
          // onSubmit={...}
        />
      )}

      <CardUserLog
        created_by={data?.created_by || 1}
        updated_by={data?.updated_by || 1}
        created_at={data?.created_at || '2025-08-15T06:06:51.338Z'}
        updated_at={data?.updated_at || '2025-08-15T06:06:51.338Z'}
      />
    </>
  );
};

export default MenuLandingView;
