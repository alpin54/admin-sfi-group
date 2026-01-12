// -- libraries
import { useEffect, useState } from 'react';
import { Form, Button, Input, Flex, Checkbox, Drawer, Row, Col } from 'antd';

// -- icons
import {
  LayoutOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  UserOutlined,
  FileDoneOutlined,
  AuditOutlined,
  FilePdfOutlined,
  DiffOutlined,
  CopyOutlined,
  CodeOutlined,
  UnorderedListOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  MenuOutlined,
  UserAddOutlined,
  BgColorsOutlined,
  ClockCircleOutlined,
  MailOutlined,
  BookOutlined
} from '@ant-design/icons';

// -- styles
import style from '@components/Role/Drawer/styles/style.module.scss';

// -- utils
import LocalStorage from '@utils/localStorage';

const RoleDrawerView = (props) => {
  const {
    method,
    setMethod,
    open,
    onClose,
    data,
    permissionOptions,
    accessOptions,
    formInstance,
    notify,
    onSubmit,
    message,
    ready,
    loading,
    refetch
  } = props;
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [checkedAccess, setCheckedAccess] = useState([]);
  const user = LocalStorage.get('user');
  const viewOnly = method === 'detail';
  const methodType = method === 'edit' ? 'put' : 'post';
  const title = method === 'add' ? 'Add Role' : method === 'edit' ? 'Edit Role' : 'Detail Role';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'changed' : '';

  // -- iconMap for dynamic icons
  const permissionIcons = {
    view: <EyeOutlined />,
    create: <PlusOutlined />,
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  };

  const accessIcons = {
    overview: <LayoutOutlined />,
    revenue: <DollarCircleOutlined />,
    order: <ShopOutlined />,
    product: <ShoppingOutlined />,
    voucher: <TagOutlined />,
    member: <UserAddOutlined />,
    pages: <CopyOutlined />,
    menu: <UnorderedListOutlined />,
    footer: <DownloadOutlined />,
    popup: <BgColorsOutlined />,
    meta: <CodeOutlined />,
    career: <AuditOutlined />,
    'form-submission': <FileDoneOutlined />,
    admin: <EditOutlined />,
    'user-log': <ClockCircleOutlined />,
    email: <MailOutlined />,
    subscriber: <BookOutlined />
  };

  // Set default values on load
  useEffect(() => {
    if (methodType === 'add') {
      formInstance?.resetFields();
    } else {
      if (data && formInstance) {
        // Transform permissions dari string ke id
        const permissionIds = Array.isArray(data.permission)
          ? data.permission
              .map((value) => {
                switch (value) {
                  case 'can_view':
                    return 1;
                  case 'can_create':
                    return 2;
                  case 'can_edit':
                    return 3;
                  case 'can_delete':
                    return 4;
                  default:
                    return null;
                }
              })
              .filter(Boolean)
          : [];

        // Transform access: ambil menu_id yang access === true
        const accessIds = Array.isArray(data.access)
          ? data.access.filter((item) => item.access).map((item) => item.menu_id)
          : [];

        // Set form values sekali saja
        formInstance.setFieldsValue({
          ...data,
          permissions: permissionIds,
          access: accessIds
        });

        setCheckedPermissions(permissionIds);
        setCheckedAccess(accessIds);
      }
    }
  }, [data, methodType, formInstance, permissionOptions]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `${title} Failed`,
        description: message
      });
    }
  }, [message, notify, title]);

  // Handle check all permissions
  const handleCheckAllPermissions = (e) => {
    const checked = e.target.checked;
    const newPermissions = checked ? permissionOptions.map((item) => item.id) : [];
    setCheckedPermissions(newPermissions);
    formInstance.setFieldsValue({ permissions: newPermissions });
  };

  // Handle check all access
  const handleCheckAllAccess = (e) => {
    const checked = e.target.checked;
    const newAccess = checked ? accessOptions.map((item) => item.id) : [];
    setCheckedAccess(newAccess);
    formInstance.setFieldsValue({ access: newAccess });
  };

  // Handle permission changes
  const onChangePermissions = (list) => {
    setCheckedPermissions(list);
  };

  // Handle access changes
  const onChangeAccess = (list) => {
    setCheckedAccess(list);
  };

  const handleEnableForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMethod('edit');
  };

  const handleFinish = async (values) => {
    try {
      const mappedAccess = values.access.map((menuId) => {
        const permissions = values.permissions;

        return {
          menu_id: menuId,
          can_view: permissions.includes(1),
          can_create: permissions.includes(2),
          can_edit: permissions.includes(3),
          can_delete: permissions.includes(4)
        };
      });

      const payload = {
        ...values,
        permissions: mappedAccess,
        ...(methodType === 'post' ? { created_by: user?.id } : { updated_by: user?.id })
      };

      // Submit form data
      const response = await onSubmit(payload, methodType);

      if (response) {
        notify({
          type: 'success',
          message: `Data ${msg} successfully`
        });
        formInstance?.resetFields();
        refetch();
        onClose();
      }
    } catch (err) {
      console.log('Error:', err);

      notify({
        type: 'error',
        message: `Data failed to ${msg}`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      {viewOnly ? (
        <Button type='primary' htmlType='button' onClick={handleEnableForm}>
          Edit
        </Button>
      ) : (
        <Button type='primary' htmlType='submit' form='form-role' loading={loading}>
          Save
        </Button>
      )}
    </>
  );

  return (
    <Drawer
      title={title}
      width={684}
      open={open}
      footer={footerComponent}
      onClose={onClose}
      closable={true}
      className='drawer-form'
      loading={ready}>
      <Form form={formInstance} id='form-role' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        {/* ID */}
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        {/* Role Name */}
        <Form.Item label='Role Name' name='name' rules={[{ required: true, message: 'Role Name is required!' }]}>
          <Input allowClear disabled={viewOnly} />
        </Form.Item>
        {/* Permissions */}
        <Form.Item label='Permissions' required>
          <div className={style.checkbox}>
            <Checkbox
              onChange={handleCheckAllPermissions}
              checked={checkedPermissions.length === permissionOptions.length}
              disabled={viewOnly}>
              <MenuOutlined />
              Full Permission
            </Checkbox>
          </div>
        </Form.Item>
        <Form.Item name='permissions'>
          <Checkbox.Group onChange={onChangePermissions} disabled={viewOnly}>
            <Row gutter={[16, 16]}>
              {permissionOptions.map((item) => (
                <Col span={12} key={item.id}>
                  <div className={style.checkbox}>
                    <Checkbox key={item.id} value={item.id}>
                      {permissionIcons[item.icon]} {item.name}
                    </Checkbox>
                  </div>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        {/* Access */}
        <Form.Item label='Access' required>
          <div className={style.checkbox}>
            <Checkbox
              onChange={handleCheckAllAccess}
              checked={checkedAccess.length === accessOptions?.length}
              disabled={viewOnly}>
              <MenuOutlined />
              Full Access
            </Checkbox>
          </div>
        </Form.Item>
        <Form.Item name='access'>
          <Checkbox.Group onChange={onChangeAccess} disabled={viewOnly}>
            <Row gutter={[16, 16]}>
              {accessOptions.map((item) => (
                <Col span={12} key={item.id}>
                  <div className={style.checkbox}>
                    <Checkbox value={item.id}>
                      {accessIcons[item.icon]} {item.name}
                    </Checkbox>
                  </div>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default RoleDrawerView;
