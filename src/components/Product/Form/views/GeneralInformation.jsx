// -- libraries
import { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Switch, Button, Table, Modal, Space } from 'antd';

// -- icons
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Product/Form/styles/style.module.scss';

// -- elements
import TextEditor from '@elements/TextEditor/views';
import TranslationTabs from '@elements/TranslationTabs/views';

const GeneralInformation = ({ viewOnly, featureEnabled, setFeatureEnabled, formInstance }) => {
  const [features, setFeatures] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [modalForm] = Form.useForm();

  // Load features from form when data is available
  useEffect(() => {
    const formFeatures = formInstance?.getFieldValue('features');
    if (formFeatures && Array.isArray(formFeatures)) {
      setFeatures(formFeatures.map((f, index) => ({ ...f, key: index })));
    }
  }, [formInstance]);

  // Sync features with form
  useEffect(() => {
    if (formInstance) {
      formInstance.setFieldValue(
        'features',
        features.map(({ key, ...rest }) => rest)
      );
    }
  }, [features, formInstance]);

  const handleAddFeature = () => {
    setEditingFeature(null);
    modalForm.resetFields();
    setIsModalVisible(true);
  };

  const handleEditFeature = (record) => {
    setEditingFeature(record);
    modalForm.setFieldsValue({
      title: record.title,
      description: record.description
    });
    setIsModalVisible(true);
  };

  const handleToggleStatus = (record) => {
    setFeatures((prev) => prev.map((f) => (f.key === record.key ? { ...f, status: f.status === 1 ? 0 : 1 } : f)));
  };

  const handleDeleteFeature = (record) => {
    Modal.confirm({
      content: 'Are you sure you want to delete this feature?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setFeatures((prev) => prev.filter((f) => f.key !== record.key));
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await modalForm.validateFields();

      if (editingFeature) {
        // Update existing feature
        setFeatures((prev) =>
          prev.map((f) =>
            f.key === editingFeature.key ? { ...f, title: values.title, description: values.description } : f
          )
        );
      } else {
        // Add new feature
        const newFeature = {
          key: Date.now(),
          title: values.title,
          description: values.description,
          status: 1
        };
        setFeatures((prev) => [...prev, newFeature]);
      }

      setIsModalVisible(false);
      modalForm.resetFields();
      setEditingFeature(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    modalForm.resetFields();
    setEditingFeature(null);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 160
    },
    {
      title: 'Descriptions',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <div
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: text }}></div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='small'>
          <Button
            type='text'
            size='small'
            icon={<EditOutlined />}
            onClick={() => handleEditFeature(record)}
            disabled={viewOnly}
            title='Edit'
          />
          <Button
            type='text'
            size='small'
            icon={record.status === 1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => handleToggleStatus(record)}
            disabled={viewOnly}
            title={record.status === 1 ? 'Active' : 'Inactive'}
          />
          <Button
            type='text'
            size='small'
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteFeature(record)}
            disabled={viewOnly}
            title='Delete'
          />
        </Space>
      )
    }
  ];

  return (
    <>
      <TranslationTabs>
        {(lang) => (
          <>
            <Form.Item
              label='Product Name'
              name={[lang, 'name']}
              rules={[{ required: true, message: 'Please input product name!' }]}>
              <Input placeholder='Enter product name' disabled={viewOnly} />
            </Form.Item>

            <Form.Item label='Custom URL' name={[lang, 'slug']}>
              <Input placeholder='Enter custom url' disabled={viewOnly} />
            </Form.Item>

            <Form.Item
              label='Deskripsi'
              name={[lang, 'description']}
              rules={[{ required: true, message: 'Please input deskripsi!' }]}>
              <TextEditor readOnly={viewOnly} />
            </Form.Item>

            <Row align='middle' gutter={[12]} className={style.row} style={{ marginBottom: 16 }}>
              <Col>
                <Switch
                  checked={featureEnabled}
                  onChange={(checked) => setFeatureEnabled(checked)}
                  disabled={viewOnly}
                />
              </Col>
              <Col>Feature</Col>
            </Row>

            {featureEnabled && (
              <div style={{ marginBottom: 24 }}>
                <Table
                  columns={columns}
                  dataSource={features}
                  pagination={false}
                  locale={{ emptyText: 'No features added yet' }}
                />

                {!viewOnly && (
                  <Button
                    color='primary'
                    variant='outlined'
                    size='small'
                    onClick={handleAddFeature}
                    style={{ marginTop: 16 }}>
                    Add Feature
                  </Button>
                )}
              </div>
            )}

            {/* Hidden form item to store features data */}
            <Form.Item name='features' hidden>
              <Input />
            </Form.Item>
          </>
        )}
      </TranslationTabs>

      {/* Modal for Add/Edit Feature */}
      <Modal
        title={editingFeature ? 'Edit Feature' : 'Add Feature'}
        open={isModalVisible}
        okText={editingFeature ? 'Update' : 'Add'}
        cancelText='Cancel'
        width={640}
        footer={
          <>
            <Button color='primary' variant='outlined' onClick={handleModalCancel}>
              Cancel
            </Button>
            <Button type='primary' onClick={handleModalOk}>
              Add Feature
            </Button>
          </>
        }
        className='modal-form'>
        <Form form={modalForm} layout='vertical' style={{ marginTop: 24 }}>
          <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please input feature title!' }]}>
            <Input placeholder='Enter feature title' />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true, message: 'Please input feature description!' }]}>
            <TextEditor readOnly={viewOnly} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { GeneralInformation };
