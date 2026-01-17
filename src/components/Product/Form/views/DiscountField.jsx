// -- libraries
import { Row, Col, Form, Switch, InputNumber, DatePicker } from 'antd';

// -- utils
import Currency from '@utils/currency';

const DiscountField = ({
  label,
  prefix,
  price,
  discountEnabled,
  setDiscountEnabled,
  scheduleEnabled,
  setScheduleEnabled,
  scheduleDateRange,
  setScheduleDateRange,
  discountNumber,
  discountPercentage,
  onNumberChange,
  onPercentageChange,
  viewOnly,
  rangePresets
}) => {
  const { RangePicker } = DatePicker;
  return (
    <Row gutter={[16, 16]} className='ant-form-item' align='bottom'>
      <Col span={8}>
        <Form.Item
          label={
            <Switch
              checked={discountEnabled}
              onChange={(checked) => {
                setDiscountEnabled(checked);
                if (!checked) {
                  onNumberChange(0);
                }
              }}
              data-label={`${label} Discount`}
              size='small'
              disabled={viewOnly}
            />
          }
          name={`discount_${prefix}_number`}>
          <InputNumber
            min={0}
            step={1000}
            placeholder='Rp'
            disabled={!discountEnabled || viewOnly}
            value={discountNumber}
            onChange={(val) => onNumberChange(val, price)}
            formatter={(value) => {
              if (value || value === 0) return Currency.formatRp(value);
              return '';
            }}
            parser={(value) => {
              const parsed = Currency.removeRp(value || '');
              return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
            }}
          />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name={`discount_${prefix}`}>
          <InputNumber
            min={0}
            max={100}
            step={1}
            disabled={!discountEnabled || viewOnly}
            value={discountPercentage}
            onChange={(val) => onPercentageChange(val, price)}
            formatter={(value) => (value ? `${value}%` : '')}
            parser={(value) => value?.replace('%', '')}
            suffix='%'
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label={
            <Switch
              checked={scheduleEnabled}
              onChange={(checked) => setScheduleEnabled(checked)}
              data-label={`${label} Schedule`}
              size='small'
              disabled={viewOnly}
            />
          }
          name={`discount_${prefix}_schedule`}>
          <RangePicker
            disabled={!scheduleEnabled || viewOnly}
            allowClear={false}
            format='DD MMM YYYY'
            presets={rangePresets}
            value={scheduleDateRange}
            onChange={(dates) => setScheduleDateRange(dates)}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export { DiscountField };
