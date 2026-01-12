// -- libraries
import { useEffect, useState } from 'react';
import { Breadcrumb, Form, Button, Input, Row, Col, Card, Select, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// -- styles
import style from '@components/Career/Form/styles/style.module.scss';

// -- hooks
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';
import TextEditor from '@components/Elements/TextEditor/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const CareerFormView = (props) => {
  const {
    slug,
    action,
    data,
    loading,
    message,
    onSubmit,
    categoryJobTypeOptions,
    categoryWorkplaceOptions,
    onFilterChange
  } = props;

  const { notify, contextHolder: notificationHolder } = useNotification();
  const [formInstance] = Form.useForm();
  const router = useRouter();
  const [viewOnly, setViewOnly] = useState(action === 'detail');
  const title = slug ? action : 'Add';
  const method = slug ? 'put' : 'post';
  const user = LocalStorage.get('user');

  // selected ids for controlled selects
  const [selectedWorkplaceId, setSelectedWorkplaceId] = useState(undefined);
  const [selectedJobTypeId, setSelectedJobTypeId] = useState(undefined);

  // initialize form values and selected ids when `data` changes
  useEffect(() => {
    if (data && formInstance) {
      formInstance.setFieldsValue(data);
    }

    if (data) {
      const wpId = data.workplace_type_id ?? data.workplace_type?.id ?? data.workplace_type ?? undefined;
      const jobId = data.job_type_id ?? data.job_type?.id ?? data.job_type ?? undefined;
      setSelectedWorkplaceId(wpId);
      setSelectedJobTypeId(jobId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // when adding new, prefer to auto-select first option if available
  useEffect(() => {
    if (action === 'add') {
      if ((selectedWorkplaceId === undefined || selectedWorkplaceId === null) && categoryWorkplaceOptions.length > 0) {
        setSelectedWorkplaceId(categoryWorkplaceOptions[0].id);
        formInstance.setFieldsValue({ workplace_type_id: categoryWorkplaceOptions[0].id });
      }
      if ((selectedJobTypeId === undefined || selectedJobTypeId === null) && categoryJobTypeOptions.length > 0) {
        setSelectedJobTypeId(categoryJobTypeOptions[0].id);
        formInstance.setFieldsValue({ job_type_id: categoryJobTypeOptions[0].id });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, categoryWorkplaceOptions, categoryJobTypeOptions]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `${title} data failed!`,
        description: message
      });
    }
  }, [message, notify, title]);

  // Submit
  const handleFinish = async (values) => {
    try {
      const wpId = values.workplace_type_id ?? selectedWorkplaceId;
      const jobId = values.job_type_id ?? selectedJobTypeId;
      const numericUserId = Number.isFinite(Number(user?.id)) ? Number(user?.id) : undefined;

      const payload = {
        ...values,
        workplace_type_id: wpId !== undefined && wpId !== null ? Number(wpId) : undefined,
        job_type_id: jobId !== undefined && jobId !== null ? Number(jobId) : undefined,
        ...(method === 'post'
          ? { status: true, ...(numericUserId !== undefined && { created_by: numericUserId }) }
          : { ...(numericUserId !== undefined && { updated_by: numericUserId }) })
      };
      const checkEn = payload.en !== undefined && payload.en !== null;
      const checkId = payload.id !== undefined && payload.id !== null;

      if (checkEn) {
        if (checkId) {
          // const response = await onSubmit(payload, slug ? 'put' : 'post');
          // if (response) {
          //   notify({ type: 'success', message: `Data ${title} successfully` });
          //   formInstance.resetFields();
          //   router.push('/career');
          // }
        } else {
          notify({
            type: 'error',
            message: `Data failed to ${title}`,
            description: 'Please fill in at ID language tab'
          });
        }
      } else {
        notify({
          type: 'error',
          message: `Data failed to ${title}`,
          description: 'Please fill in at EN language tab'
        });
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data failed to ${title}`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const handleEnableForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setViewOnly(false);
  };

  // Select handlers (update form and local state)
  const handleSelectWorkplace = (val) => {
    setSelectedWorkplaceId(val);
    formInstance.setFieldsValue({ workplace_type_id: val });
    if (typeof onFilterChange === 'function') {
      onFilterChange({ workplace_type_id: val });
    }
  };

  const handleSelectJobType = (val) => {
    setSelectedJobTypeId(val);
    formInstance.setFieldsValue({ job_type_id: val });
    if (typeof onFilterChange === 'function') {
      onFilterChange({ job_type_id: val });
    }
  };

  return (
    <>
      {notificationHolder}
      <section id='Career-form' className='section-form'>
        <div className='row-container' style={{ marginBottom: 12 }}>
          <Breadcrumb
            items={[
              { title: <Link href='/career'>Career</Link> },
              {
                title:
                  action === 'add'
                    ? 'Add Career'
                    : action === 'edit'
                      ? `Edit ${data?.title ?? ''}`
                      : `Details ${data?.title ?? ''}`
              }
            ]}
          />
        </div>

        <Form form={formInstance} id='form-career' layout='vertical' onFinish={handleFinish} autoComplete='off'>
          {/* id hidden */}
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>

          <Row gutter={24}>
            {/* LEFT SIDE */}
            <Col span={14}>
              <Card title='Job Information' className={style.card}>
                <TranslationTabs>
                  {(lang) => (
                    <>
                      <Form.Item
                        label='Position Title'
                        name={[lang, 'title']}
                        rules={[{ required: true, message: 'Please input title!' }]}>
                        <Input allowClear readOnly={viewOnly} />
                      </Form.Item>

                      <Form.Item
                        label='Overview'
                        name={[lang, 'overview']}
                        rules={[{ required: true, message: 'Please input overview!' }]}>
                        <Input.TextArea readOnly={viewOnly} />
                      </Form.Item>

                      <Form.Item
                        label='Responsibilities'
                        name={[lang, 'responsibilities']}
                        rules={[{ required: true, message: 'Please input responsibilities!' }]}>
                        <TextEditor readOnly={viewOnly} />
                      </Form.Item>
                    </>
                  )}
                </TranslationTabs>
              </Card>

              <Card title='Qualifications & Benefits' className={style.card}>
                <TranslationTabs>
                  {(lang) => (
                    <>
                      <Form.Item
                        label='Qualifications'
                        name={[lang, 'qualifications']}
                        rules={[{ required: true, message: 'Please input qualifications!' }]}>
                        <TextEditor readOnly={viewOnly} />
                      </Form.Item>

                      <Form.Item
                        label='Perks & Benefit'
                        name={[lang, 'benefit']}
                        rules={[{ required: true, message: 'Please input qualifications!' }]}>
                        <TextEditor readOnly={viewOnly} />
                      </Form.Item>
                    </>
                  )}
                </TranslationTabs>
              </Card>
            </Col>

            {/* RIGHT SIDE */}
            <Col span={10}>
              <Card title='Job Type' className={style.card}>
                <Form.Item label='Job Type' name='job_type_name' rules={[{ required: true }]}>
                  <Select
                    showSearch
                    allowClear
                    placeholder='Select Job Type'
                    optionFilterProp='label'
                    options={categoryJobTypeOptions?.map((category) => ({
                      label: category.name,
                      value: category.id
                    }))}
                    onChange={handleSelectJobType}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    style={{ width: '100%' }}
                    disabled={viewOnly}
                    value={formInstance.getFieldValue('job_type_id') ?? selectedJobTypeId}
                  />
                </Form.Item>
              </Card>

              <Card title='Workplace' className={style.card}>
                <Form.Item label='Workplace' name='workplace_type_name' rules={[{ required: true }]}>
                  <Select
                    showSearch
                    allowClear
                    placeholder='Select Workplace'
                    optionFilterProp='label'
                    options={categoryWorkplaceOptions?.map((category) => ({
                      label: category.name,
                      value: category.id
                    }))}
                    onChange={handleSelectWorkplace}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    style={{ width: '100%' }}
                    disabled={viewOnly}
                    value={formInstance.getFieldValue('workplace_type_id') ?? selectedWorkplaceId}
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item shouldUpdate className='floating-btn'>
            <Space size={16}>
              <Link href='/career'>
                <Button>Cancel</Button>
              </Link>

              {viewOnly ? (
                <Button type='primary' htmlType='button' onClick={handleEnableForm}>
                  Edit
                </Button>
              ) : (
                <Button type='primary' htmlType='submit' form='form-career' loading={loading}>
                  Save
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
        {slug && (
          <CardUserLog
            created_by={data?.created_by ?? 1}
            updated_by={data?.updated_by ?? 1}
            created_at={data?.created_at ?? '2025-01-01T00:00:00.000Z'}
            updated_at={data?.updated_at ?? '2025-01-01T00:00:00.000Z'}
          />
        )}
      </section>
    </>
  );
};

export default CareerFormView;
