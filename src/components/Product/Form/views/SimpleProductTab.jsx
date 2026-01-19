// -- libraries
import { Form, Input, InputNumber, Row, Col, Switch } from 'antd';

// -- utils
import Currency from '@utils/currency';

// -- components
import { DiscountField } from '@components/Product/Form/views/DiscountField';

const SimpleProductTab = ({
  viewOnly,
  formInstance,
  memberPrice,
  dealerPrice,
  discountHook,
  manageStockEnabled,
  setManageStockEnabled,
  rangePresets
}) => {
  return (
    <>
      <Form.Item label='SKU' name='sku' rules={[{ required: true, message: 'Please input SKU!' }]}>
        <Input placeholder='Enter SKU' disabled={viewOnly} />
      </Form.Item>

      <Form.Item
        label='Member Price'
        name='member_price'
        rules={[{ required: true, message: 'Please input member price!' }]}>
        <InputNumber
          min={0}
          step={1000}
          placeholder='Rp'
          disabled={viewOnly}
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

      <DiscountField
        label='Member'
        prefix='member'
        price={memberPrice}
        discountEnabled={discountHook.memberDiscountEnabled}
        setDiscountEnabled={discountHook.setMemberDiscountEnabled}
        scheduleEnabled={discountHook.memberScheduleEnabled}
        setScheduleEnabled={discountHook.setMemberScheduleEnabled}
        scheduleDateRange={discountHook.memberScheduleDateRange}
        setScheduleDateRange={discountHook.setMemberScheduleDateRange}
        discountNumber={discountHook.memberDiscountNumber}
        discountPercentage={discountHook.memberDiscountPercentage}
        onNumberChange={discountHook.handleMemberNumberChange}
        onPercentageChange={discountHook.handleMemberPercentageChange}
        viewOnly={viewOnly}
        rangePresets={rangePresets}
      />

      <Form.Item
        label='Dealer Price'
        name='dealer_price'
        rules={[{ required: true, message: 'Please input dealer price!' }]}>
        <InputNumber
          min={0}
          step={1000}
          placeholder='Rp'
          disabled={viewOnly}
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

      <DiscountField
        label='Dealer'
        prefix='dealer'
        price={dealerPrice}
        discountEnabled={discountHook.dealerDiscountEnabled}
        setDiscountEnabled={discountHook.setDealerDiscountEnabled}
        scheduleEnabled={discountHook.dealerScheduleEnabled}
        setScheduleEnabled={discountHook.setDealerScheduleEnabled}
        scheduleDateRange={discountHook.dealerScheduleDateRange}
        setScheduleDateRange={discountHook.setDealerScheduleDateRange}
        discountNumber={discountHook.dealerDiscountNumber}
        discountPercentage={discountHook.dealerDiscountPercentage}
        onNumberChange={discountHook.handleDealerNumberChange}
        onPercentageChange={discountHook.handleDealerPercentageChange}
        viewOnly={viewOnly}
        rangePresets={rangePresets}
      />

      <Form.Item
        label={
          <Switch
            checked={manageStockEnabled}
            onChange={(checked) => setManageStockEnabled(checked)}
            data-label='Manage Stock'
            size='small'
            disabled={viewOnly}
          />
        }
        name='stock'>
        <Input type='number' placeholder='Stock' disabled={!manageStockEnabled || viewOnly} />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label='Weight' name='weight' rules={[{ required: true, message: 'Please input weight!' }]}>
            <Input suffix='g' type='number' placeholder='Weight' disabled={viewOnly} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Width' name='width' rules={[{ required: true, message: 'Please input width!' }]}>
            <Input suffix='cm' type='number' placeholder='Width' disabled={viewOnly} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Length' name='length' rules={[{ required: true, message: 'Please input length!' }]}>
            <Input suffix='cm' type='number' placeholder='Length' disabled={viewOnly} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Height' name='height' rules={[{ required: true, message: 'Please input height!' }]}>
            <Input suffix='cm' type='number' placeholder='Height' disabled={viewOnly} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export { SimpleProductTab };
