// -- libraries
import { useEffect, useState } from 'react';
import { Breadcrumb, Form, Switch, Button, Input, Row, Col, Select, Space, Collapse } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PieChartOutlined, DownOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Career/Form/styles/style.module.scss';

// -- hooks
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';
import CardSummary from '@components/Elements/CardSummary/views';
import TextEditor from '@components/Elements/TextEditor/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const CareerFormView = (props) => {
  const {
    slug,
    action,
    data,
    summaryCareer,
    summaryApplication,
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

  const dataSummaryCareer = summaryCareer;
  const dataSummaryApplication = summaryApplication;

  const careerTitleText = (() => {
    if (!data) return '';
    const maybeEn = data?.en?.title ?? data?.title?.en;
    const maybeId = data?.id?.title ?? data?.title?.id;
    const maybePlain = data?.title;

    if (typeof maybeEn === 'string') return maybeEn;
    if (typeof maybeId === 'string') return maybeId;
    if (typeof maybePlain === 'string') return maybePlain;
    return '';
  })();

  // selected ids for controlled selects
  const [selectedWorkplaceIds, setSelectedWorkplaceIds] = useState([]);
  const [selectedJobTypeIds, setSelectedJobTypeIds] = useState([]);

  // toggles
  const [responsibilitiesEnabled, setResponsibilitiesEnabled] = useState(false);
  const [qualificationsEnabled, setQualificationsEnabled] = useState(false);
  const [benefitEnabled, setBenefitEnabled] = useState(false);

  // initialize form values and selected ids when `data` changes
  useEffect(() => {
    if (data && formInstance) {
      formInstance.setFieldsValue(data);
    }

    if (data) {
      const wpId = data.workplace_type_id ?? data.workplace_type?.id ?? data.workplace_type ?? undefined;
      const jobId = data.job_type_id ?? data.job_type?.id ?? data.job_type ?? undefined;
      const wpIds = Array.isArray(wpId) ? wpId : wpId != null ? [wpId] : [];
      const jobIds = Array.isArray(jobId) ? jobId : jobId != null ? [jobId] : [];
      setSelectedWorkplaceIds(wpIds);
      setSelectedJobTypeIds(jobIds);
      try {
        formInstance.setFieldsValue({ workplace_type_id: wpIds, job_type_id: jobIds });
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // NOTE: keep Job Type / Workplace empty on first open (show placeholder)

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
      const wpId = values.workplace_type_id ?? selectedWorkplaceIds;
      const jobId = values.job_type_id ?? selectedJobTypeIds;
      const numericUserId = Number.isFinite(Number(user?.id)) ? Number(user?.id) : undefined;

      const payload = {
        ...values,
        workplace_type_id: wpId,
        job_type_id: jobId,
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
    const nextVal = Array.isArray(val) ? val : val != null ? [val] : [];
    setSelectedWorkplaceIds(nextVal);
    formInstance.setFieldsValue({ workplace_type_id: nextVal });
    if (typeof onFilterChange === 'function') {
      onFilterChange({ workplace_type_id: nextVal });
    }
  };

  const handleSelectJobType = (val) => {
    const nextVal = Array.isArray(val) ? val : val != null ? [val] : [];
    setSelectedJobTypeIds(nextVal);
    formInstance.setFieldsValue({ job_type_id: nextVal });
    if (typeof onFilterChange === 'function') {
      onFilterChange({ job_type_id: nextVal });
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
                      ? `Edit ${careerTitleText}`
                      : `Detail ${careerTitleText}`
              }
            ]}
          />
        </div>

        <Form form={formInstance} id='form-career' layout='vertical' onFinish={handleFinish} autoComplete='off'>
          {/* id hidden */}
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>

          {action === 'detail' && (
            <Row gutter={[16, 16]} className='row-container'>
              <Col xs={24} sm={24}>
                <CardSummary
                  icon={<PieChartOutlined />}
                  title='Total Applicants'
                  value={dataSummaryApplication?.total}
                />
              </Col>
            </Row>
          )}

          <Row gutter={24}>
            {/* LEFT SIDE */}
            <Col span={14}>
              <Collapse
                className={style.collapse}
                expandIconPosition='end'
                expandIcon={() => <DownOutlined />}
                defaultActiveKey={['jobInformation', 'qualificationsBenefits']}
                items={[
                  {
                    key: 'jobInformation',
                    label: 'Job Information',
                    children: (
                      <TranslationTabs>
                        {(lang) => (
                          <>
                            <Form.Item
                              label='Position Title'
                              name={[lang, 'title']}
                              rules={[{ required: true, message: 'Please input title!' }]}>
                              <Input allowClear disabled={viewOnly} />
                            </Form.Item>

                            <Form.Item
                              label='Overview'
                              name={[lang, 'overview']}
                              rules={[{ required: true, message: 'Please input overview!' }]}>
                              <Input.TextArea disabled={viewOnly} />
                            </Form.Item>

                            <Form.Item
                              label={
                                <Switch
                                  checked={responsibilitiesEnabled}
                                  onChange={(checked) => {
                                    setResponsibilitiesEnabled(checked);
                                    if (!checked) {
                                      // clear both languages
                                      try {
                                        formInstance.setFields([
                                          { name: ['en', 'responsibilities'], value: '' },
                                          { name: ['id', 'responsibilities'], value: '' }
                                        ]);
                                      } catch {
                                        // ignore
                                      }
                                    }
                                  }}
                                  data-label='Responsibilities'
                                  size='small'
                                  disabled={viewOnly}
                                />
                              }
                              name={[lang, 'responsibilities']}
                              rules={
                                responsibilitiesEnabled
                                  ? [{ required: true, message: 'Please input responsibilities!' }]
                                  : []
                              }>
                              <TextEditor readOnly={viewOnly || !responsibilitiesEnabled} />
                            </Form.Item>
                          </>
                        )}
                      </TranslationTabs>
                    )
                  },
                  {
                    key: 'qualificationsBenefits',
                    label: 'Qualifications & Benefits',
                    children: (
                      <TranslationTabs>
                        {(lang) => (
                          <>
                            <Form.Item
                              label={
                                <Switch
                                  checked={qualificationsEnabled}
                                  onChange={(checked) => {
                                    setQualificationsEnabled(checked);
                                    if (!checked) {
                                      try {
                                        formInstance.setFields([
                                          { name: ['en', 'qualifications'], value: '' },
                                          { name: ['id', 'qualifications'], value: '' }
                                        ]);
                                      } catch {
                                        // ignore
                                      }
                                    }
                                  }}
                                  data-label='Qualifications'
                                  size='small'
                                  disabled={viewOnly}
                                />
                              }
                              name={[lang, 'qualifications']}
                              rules={
                                qualificationsEnabled
                                  ? [{ required: true, message: 'Please input qualifications!' }]
                                  : []
                              }>
                              <TextEditor readOnly={viewOnly || !qualificationsEnabled} />
                            </Form.Item>

                            <Form.Item
                              label={
                                <Switch
                                  checked={benefitEnabled}
                                  onChange={(checked) => {
                                    setBenefitEnabled(checked);
                                    if (!checked) {
                                      try {
                                        formInstance.setFields([
                                          { name: ['en', 'benefit'], value: '' },
                                          { name: ['id', 'benefit'], value: '' }
                                        ]);
                                      } catch {
                                        // ignore
                                      }
                                    }
                                  }}
                                  data-label='Perks & Benefit'
                                  size='small'
                                  disabled={viewOnly}
                                />
                              }
                              name={[lang, 'benefit']}
                              rules={
                                benefitEnabled ? [{ required: true, message: 'Please input qualifications!' }] : []
                              }>
                              <TextEditor readOnly={viewOnly || !benefitEnabled} />
                            </Form.Item>
                          </>
                        )}
                      </TranslationTabs>
                    )
                  }
                ]}
              />
            </Col>

            {/* RIGHT SIDE */}
            <Col span={10}>
              <Collapse
                className={style.collapse}
                expandIconPosition='end'
                expandIcon={() => <DownOutlined />}
                defaultActiveKey={['jobType', 'workplace']}
                items={[
                  {
                    key: 'jobType',
                    label: 'Job Type',
                    children: (
                      <Form.Item name='job_type_id' rules={[{ required: true, message: 'Please enter Job Type' }]}>
                        <Select
                          mode='multiple'
                          showSearch
                          allowClear
                          placeholder='Select job type'
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
                          value={formInstance.getFieldValue('job_type_id') ?? selectedJobTypeIds}
                        />
                      </Form.Item>
                    )
                  },
                  {
                    key: 'workplace',
                    label: 'Workplace',
                    children: (
                      <Form.Item
                        name='workplace_type_id'
                        rules={[{ required: true, message: 'Please enter Workplace' }]}>
                        <Select
                          mode='multiple'
                          showSearch
                          allowClear
                          placeholder='Select workplace'
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
                          value={formInstance.getFieldValue('workplace_type_id') ?? selectedWorkplaceIds}
                        />
                      </Form.Item>
                    )
                  }
                ]}
              />
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
