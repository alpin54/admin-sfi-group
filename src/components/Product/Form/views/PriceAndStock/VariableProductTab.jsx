// -- libraries
import { Form, Input, Row, Col, DatePicker, Switch } from 'antd';

// -- components
import { AttributeVariation } from '@components/Product/Form/views/AttributeVariation';
import { VariantTable } from '@components/Product/Form/views/VariantTable';

const VariableProductTab = ({
  viewOnly,
  formInstance,
  discountHook,
  rangePresets,
  materialOptions,
  sizeOptions,
  colorOptions,
  data,
  notify,
  setTabKey,
  attributesHook,
  variantsHook,
  groupImagesHook
}) => {
  const { RangePicker } = DatePicker;
  return (
    <>
      <div className='row-container'>
        <AttributeVariation
          viewOnly={viewOnly}
          materialOptions={materialOptions}
          sizeOptions={sizeOptions}
          colorOptions={colorOptions}
          data={data}
          notify={notify}
          setTabKey={setTabKey}
          attributesHook={attributesHook}
        />

        <VariantTable
          viewOnly={viewOnly}
          formInstance={formInstance}
          attributes={attributesHook.attributes}
          data={data}
          variantsHook={variantsHook}
          groupImagesHook={groupImagesHook}
        />
      </div>

      <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
        <Col span={12}>
          <Form.Item
            label={
              <Switch
                checked={discountHook.memberScheduleEnabled}
                onChange={(checked) => discountHook.setMemberScheduleEnabled(checked)}
                data-label='Member Schedule'
                size='small'
                disabled={viewOnly}
              />
            }
            name='discount_member_schedule'>
            <RangePicker
              disabled={!discountHook.memberScheduleEnabled || viewOnly}
              allowClear={false}
              format='DD MMM YYYY'
              presets={rangePresets}
              value={discountHook.memberScheduleDateRange}
              onChange={(dates) => discountHook.setMemberScheduleDateRange(dates)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={
              <Switch
                checked={discountHook.dealerScheduleEnabled}
                onChange={(checked) => discountHook.setDealerScheduleEnabled(checked)}
                data-label='Dealer Schedule'
                size='small'
                disabled={viewOnly}
              />
            }
            name='discount_dealer_schedule'>
            <RangePicker
              disabled={!discountHook.dealerScheduleEnabled || viewOnly}
              allowClear={false}
              format='DD MMM YYYY'
              presets={rangePresets}
              value={discountHook.dealerScheduleDateRange}
              onChange={(dates) => discountHook.setDealerScheduleDateRange(dates)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Weight' name='weight'>
            <Input suffix='g' type='number' placeholder='Weight' disabled={viewOnly} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Width' name='width'>
            <Input suffix='cm' type='number' placeholder='Width' disabled={viewOnly} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Length' name='length'>
            <Input suffix='cm' type='number' placeholder='Length' disabled={viewOnly} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Height' name='height'>
            <Input suffix='cm' type='number' placeholder='Height' disabled={viewOnly} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export { VariableProductTab };
