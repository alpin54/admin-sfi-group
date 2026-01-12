// -- libraries
import { useCallback, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, Button, Tooltip, List, Form, Table } from 'antd';

// -- icons
import { EditOutlined, EyeOutlined, DeleteOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';
// -- components
import ModalBanner from '@components/Pages/UploadDocument/ModalBanner/widgets/Default';

const BannerUploadDocumentView = (props) => {
  // const { data, loading, onDelete, onStatus, refetch } = props;
  // const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  // const { notify, contextHolder: notificationHolder } = useNotification();
  // const [isEdit, setIsEdit] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [method, setMethod] = useState('add');
  // const [dataForm, setDataForm] = useState(undefined);
  // const [formInstance] = Form.useForm();
  // const user = LocalStorage.get('user');

  const { data, method, confirm, notify } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [methodForm, setMethodForm] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  // Show modal (Add, Edit, View)
  // const handleShowModal = useCallback(
  //   (type, record) => {
  //     formInstance.resetFields();
  //     setMethod(type);
  //     setDataForm(type === 'add' ? undefined : record);
  //     setOpen(true);
  //   },
  //   [formInstance]
  // );

  const handleShowModal = useCallback(
    (type, record) => {
      formInstance.resetFields();
      setMethodForm(type);
      setDataForm(type === 'add' ? undefined : record);
      setOpen(true);
    },
    [formInstance]
  );

  // Close modal & reset form
  const handleCloseModal = useCallback(() => {
    formInstance.resetFields();
    setDataForm(undefined);
    setOpen(false);
  }, [formInstance]);

  // Table actions
  // const handleDelete = useCallback(
  //   (item) => {
  //     confirm({
  //       icon: <DeleteOutlined />,
  //       content: `Are you sure you want to delete `,
  //       onSuccess: async () => {
  //         const response = await onDelete(item.id);
  //         if (response && !response.error) {
  //           notify({
  //             type: 'success',
  //             message: 'Data deleted successfully'
  //           });
  //         } else {
  //           notify({
  //             type: 'error',
  //             message: response.error || 'Failed to delete data'
  //           });
  //         }
  //       }
  //     });
  //   },
  //   [confirm, notify, onDelete]
  // );

  const handleDelete = useCallback(() => {
    confirm({
      icon: <DeleteOutlined style={{ color: 'red' }} />,
      content: `Are you sure you want to delete this item?`,
      onSuccess: async () => {
        notify({
          type: 'success',
          message: 'Data deleted successfully'
        });
        // await onDelete(record.id);
      }
    });
  }, [confirm, notify]);

  // const handleStatus = useCallback(
  //   (item) => {
  //     const title = item.status ? 'Hide' : 'Unhide';
  //     const status = item.status ? false : true;
  //     const payload = { id: item.id, status: status, updated_by: user.id };

  //     confirm({
  //       icon: <WarningOutlined />,
  //       content: `Are you sure you want to `,
  //       onSuccess: async () => {
  //         const response = await onStatus(payload);
  //         if (response && !response.error) {
  //           notify({
  //             type: 'success',
  //             message: `Data ${title.toLowerCase()} successfully`
  //           });
  //         } else {
  //           notify({
  //             type: 'error',
  //             message: response.error || `Failed to ${title.toLowerCase()} data`
  //           });
  //         }
  //       }
  //     });
  //   },
  //   [confirm, notify, onStatus, user]
  // );

  const handleSuspend = useCallback(
    (record) => {
      const title = record.status ? 'Suspend' : 'Unsuspend';
      const suspend = record.status ? 0 : 1;
      const payload = { id: record.id, status: suspend, updated_by: user.id };
      const formData = FormData(payload, 'suspend');

      confirm({
        icon: <WarningOutlined style={{ color: '#d6a31f' }} />,
        content: `Are you sure you want to ${title.toLowerCase()} this item?`,
        onSuccess: async () => {
          notify({
            type: 'success',
            message: `Data ${title.toLowerCase()} successfully`
          });
          // await onSuspend(formData);
        }
      });
    },
    [confirm, notify, user]
  );

  const dataSource = Array.isArray(data) ? data : [];

  // const dataColumns = useMemo(() => {
  //   const cols = [
  //     {
  //       title: 'Banner',
  //       dataIndex: 'image',
  //       key: 'image',
  //       render: (_, record) =>
  //         record?.image && <Image width={40} height={40} src={record.image} alt={`banner-${record.id}`} />
  //     }
  //   ];

  //   // Hanya tambahkan kolom Actions jika isEdit === true
  //   if (isEdit) {
  //     cols.push({
  //       title: 'Actions',
  //       key: 'actions',
  //       align: 'center',
  //       width: 200,
  //       render: (_, record) => (
  //         <>
  //           <Tooltip
  //             key={record.status ? 'suspend' : 'unsuspend'}
  //             title={record.status ? 'Suspend' : 'Unsuspend'}
  //             placement='top'>
  //             <Button
  //               size='small'
  //               type='text'
  //               icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
  //               onClick={() => handleStatus(record)}
  //             />
  //           </Tooltip>
  //           <Tooltip key='edit' title='Edit' placement='top'>
  //             <Button
  //               size='small'
  //               variant='text'
  //               color='default'
  //               icon={<EditOutlined />}
  //               onClick={() => handleShowModal('edit', record)}
  //             />
  //           </Tooltip>
  //           <Tooltip key='delete' title='Delete' placement='top'>
  //             <Button
  //               size='small'
  //               variant='text'
  //               color='default'
  //               icon={<DeleteOutlined />}
  //               onClick={() => handleDelete(record)}
  //             />
  //           </Tooltip>
  //         </>
  //       )
  //     });
  //   }

  //   return cols;
  // }, [isEdit, handleStatus, handleShowModal, handleDelete]);

  const dataColumns = useMemo(() => {
    const cols = [
      {
        title: 'Banner',
        dataIndex: 'image',
        key: 'image',
        width: 100,
        render: (_, record) =>
          record?.image && <Image width={40} height={40} src={record.image} alt={`banner-${record.id}`} />
      },
      {
        title: 'Title',
        dataIndex: ['title', 'en'],
        key: 'title'
      },
      {
        title: 'Description',
        dataIndex: ['description', 'en'],
        key: 'description'
      }
    ];

    // Hanya tambahkan kolom Actions jika isEdit === true
    if (isEdit) {
      cols.push({
        title: 'Actions',
        key: 'actions',
        align: 'center',
        width: 200,

        render: (_, record) => (
          <>
            <Tooltip
              key={record.status ? 'suspend' : 'unsuspend'}
              title={record.status ? 'Suspend' : 'Unsuspend'}
              placement='top'>
              <Button
                size='small'
                type='text'
                icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => handleSuspend(record)}
              />
            </Tooltip>
            <Tooltip key='edit' title='Edit' placement='top'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<EditOutlined />}
                onClick={() => handleShowModal('edit', record)}
              />
            </Tooltip>
            <Tooltip key='delete' title='Delete' placement='top'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              />
            </Tooltip>
          </>
        )
      });
    }

    return cols;
  }, [isEdit, handleSuspend, handleShowModal, handleDelete]);

  return (
    <>
      {/* {confirmHolder}
      {notificationHolder} */}
      {/* Banner Card */}
      <Card title='Banner'>
        <Table dataSource={dataSource} columns={dataColumns} rowKey='id' pagination={false} />
        {isEdit ? (
          <Button type='primary' onClick={() => handleShowModal('add')}>
            Add Banner
          </Button>
        ) : (
          <Button type='primary' onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        )}
      </Card>
      {/* Modal */}
      {open && (
        // <ModalBanner
        //   method={method}
        //   open={open}
        //   onClose={handleCloseModal}
        //   initialValues={dataForm}
        //   formInstance={formInstance}
        //   notify={notify}
        //   refetch={refetch}
        // />
        <ModalBanner
          method={methodForm}
          setMethod={() => setMethodForm('edit')}
          open={open}
          onClose={handleCloseModal}
          initialValues={dataForm}
          formInstance={formInstance}
          notify={notify}
        />
      )}
    </>
  );
};

export default BannerUploadDocumentView;
