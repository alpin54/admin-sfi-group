// -- libraries
import { Tabs } from 'antd';
import dayjs from 'dayjs';

// -- components
import SimpleProductTab from '@components/Product/Form/views/PriceAndStock/SimpleProductTab';
import VariableProductTab from '@components/Product/Form/views/PriceAndStock/VariableProductTab';

const PriceAndStock = ({
  tabKey,
  setTabKey,
  viewOnly,
  formInstance,
  memberPrice,
  dealerPrice,
  discountHook,
  manageStockEnabled,
  setManageStockEnabled,
  data,
  notify,
  attributesHook,
  variantsHook,
  groupImagesHook
}) => {
  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().subtract(6, 'day'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().subtract(13, 'day'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().subtract(29, 'day'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().subtract(89, 'day'), dayjs()] }
  ];

  return (
    <Tabs
      activeKey={tabKey}
      onChange={setTabKey}
      items={[
        {
          key: 'simple',
          label: 'Simple Product',
          disabled: viewOnly,
          children: (
            <SimpleProductTab
              viewOnly={viewOnly}
              formInstance={formInstance}
              memberPrice={memberPrice}
              dealerPrice={dealerPrice}
              discountHook={discountHook}
              manageStockEnabled={manageStockEnabled}
              setManageStockEnabled={setManageStockEnabled}
              rangePresets={rangePresets}
            />
          )
        },
        {
          key: 'variant',
          label: 'Variable Product',
          disabled: viewOnly,
          children: (
            <VariableProductTab
              viewOnly={viewOnly}
              formInstance={formInstance}
              discountHook={discountHook}
              rangePresets={rangePresets}
              data={data}
              notify={notify}
              setTabKey={setTabKey}
              attributesHook={attributesHook}
              variantsHook={variantsHook}
              groupImagesHook={groupImagesHook}
            />
          )
        }
      ]}
    />
  );
};

export default PriceAndStock;
