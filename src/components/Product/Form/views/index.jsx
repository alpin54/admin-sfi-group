// -- libraries
import { useEffect, useState, useMemo } from 'react';
import { Breadcrumb, Form, Button, Row, Col, Collapse, Space, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// -- icons
import { CommentOutlined, DollarCircleOutlined, DownOutlined, PieChartOutlined } from '@ant-design/icons';

// -- hooks
import useNotification from '@hooks/useNotification';
import { useDiscount } from '@hooks/useDiscount';
import { useAttributes } from '@hooks/useAttributes';
import { useVariants } from '@hooks/useVariants';
import { useGroupImages } from '@hooks/useGroupImages';

// -- utils
import LocalStorage from '@utils/localStorage';
import TransformTree from '@utils/transformTree';
import { transformImageApiToUploadInitialValue, normalizeOptions } from '@utils/productHelpers';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';
import CardSummary from '@components/Elements/CardSummary/views';

// -- components
import GeneralInformation from '@components/Product/Form/views/GeneralInformation';
import PriceAndStock from '@components/Product/Form/views/PriceAndStock';
import Sidebar from '@components/Product/Form/views/Sidebar';

const ProductFormView = (props) => {
  const { slug, action, data, loading, categoryOptions, brandOptions, colorOptions, promotionOptions, onSubmit } =
    props;

  const { notify, contextHolder } = useNotification();
  const [formInstance] = Form.useForm();
  const router = useRouter();

  const [viewOnly, setViewOnly] = useState(action === 'detail');
  const [tabKey, setTabKey] = useState('simple');
  const [featureEnabled, setFeatureEnabled] = useState(false);
  const [manageStockEnabled, setManageStockEnabled] = useState(false);

  const title = slug ? action : 'Add';
  const method = slug ? 'put' : 'post';

  const user = useMemo(() => LocalStorage.get('user'), []);
  const categoryTreeOptions = useMemo(() => TransformTree.catSelect(categoryOptions), [categoryOptions]);
  const brandTreeOptions = useMemo(() => TransformTree.brandSelect(brandOptions), [brandOptions]);
  const colorTreeOptions = useMemo(() => TransformTree.colorSelect(colorOptions), [colorOptions]);
  const promotionTreeOptions = useMemo(() => TransformTree.promotionSelect(promotionOptions), [promotionOptions]);

  // Initialize hooks - PENTING: Panggil hooks di top level, tidak di dalam useEffect
  const discountHook = useDiscount(formInstance);
  const attributesHook = useAttributes(notify);
  const variantsHook = useVariants();
  const groupImagesHook = useGroupImages();

  // Watch form values
  const memberPrice = Form.useWatch('member_price', formInstance);
  const dealerPrice = Form.useWatch('dealer_price', formInstance);

  // Update variant rows when attributes change - FIX: gunakan useCallback yang stabil
  useEffect(() => {
    if (attributesHook.attributes && attributesHook.attributes.length > 0) {
      variantsHook.updateVariantRows(attributesHook.attributes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributesHook.attributes]);

  // Initialize form
  useEffect(() => {
    if (data && formInstance) {
      const initialValues = { ...data };
      const valuesTreeOptions = TransformTree.valuesTree(data);
      const flattenedValues = TransformTree.flattenValuesTree(data);
      const imageInitialValue = transformImageApiToUploadInitialValue(data, 'cover');

      const datas = {
        ...initialValues,
        ...valuesTreeOptions,
        ...flattenedValues,
        image: imageInitialValue
      };

      formInstance.setFieldsValue(datas);

      // Initialize discount
      discountHook.initializeFromData(data);

      // Initialize other states
      setFeatureEnabled(Boolean(data.is_features));
      setManageStockEnabled(Boolean(data.is_stock));
      setTabKey(data.is_variant ? 'variant' : 'simple');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Initialize group images from data - FIX: tambah guard untuk prevent infinite loop
  useEffect(() => {
    if (!data || !Array.isArray(data.variants) || data.variants.length === 0) return;

    const activeAttrs = attributesHook.attributes ? attributesHook.attributes.filter((a) => a.active) : [];
    if (activeAttrs.length === 0) return;

    const gImages = {};

    data.variants.forEach((v) => {
      const values = activeAttrs.map((a) => {
        const key = String(a.name || '').toLowerCase();
        if (v.attributes && v.attributes[a.name]) return String(v.attributes[a.name]);
        return '';
      });

      const firstVal = values[0];
      if (firstVal && v.image) gImages[firstVal] = v.image;
    });

    const normalizedG = {};
    Object.keys(gImages).forEach((k) => {
      const v = gImages[k];
      if (typeof v === 'string') normalizedG[k] = { url: v };
      else if (v && typeof v === 'object' && (v.url || (v.response && v.response.url))) {
        normalizedG[k] = { url: v.url || v.response.url };
      } else {
        normalizedG[k] = v;
      }
    });

    // HANYA set jika ada perubahan
    const currentKeys = Object.keys(groupImagesHook.groupImages || {})
      .sort()
      .join(',');
    const newKeys = Object.keys(normalizedG).sort().join(',');

    if (currentKeys !== newKeys) {
      groupImagesHook.setGroupImages(normalizedG);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // HANYA depend pada data, bukan attributesHook.attributes

  // Initialize variant data from API - FIX: tambah guard
  useEffect(() => {
    if (!data || !Array.isArray(data.variants) || data.variants.length === 0) return;

    const activeAttrs = attributesHook.attributes ? attributesHook.attributes.filter((a) => a.active) : [];
    if (activeAttrs.length === 0) return;

    const variantMap = {};

    data.variants.forEach((v) => {
      const values = activeAttrs.map((a) => {
        const key = String(a.name || '').toLowerCase();
        if (v.attributes && v.attributes[a.name]) return String(v.attributes[a.name]);
        return '';
      });

      const key = values.join('||');
      variantMap[key] = {
        sku: v.sku ?? '',
        price: v.price ?? 0,
        stock: v.stock ?? 0,
        variant_id: v.id ?? null
      };
    });

    // HANYA set jika ada data variant
    if (Object.keys(variantMap).length > 0) {
      variantsHook.setVariantData(variantMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // HANYA depend pada data

  const handleFinish = async (values) => {
    // Submit logic here
    console.log('Form values:', values);
    console.log('Attributes:', attributesHook.attributes);
    console.log('Variant Data:', variantsHook.variantData);
    console.log('Group Images:', groupImagesHook.groupImages);
  };

  const handleEnableForm = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setViewOnly(false);
  };

  return (
    <>
      {contextHolder}
      <section id='product-form' className='section-form'>
        <div className='row-container'>
          <Breadcrumb
            items={[
              { title: <Link href='/product'>Product</Link> },
              {
                title:
                  action === 'add'
                    ? 'Add Product'
                    : action === 'edit'
                      ? `Edit ${data?.name?.en ?? ''}`
                      : `Detail ${data?.name?.en ?? ''}`
              }
            ]}
          />
        </div>

        {viewOnly && (
          <Row gutter={[16, 16]} className='row-container'>
            <Col span={8}>
              <CardSummary icon={<DollarCircleOutlined />} title='Total Revenue' value={data?.revenue || 0} />
            </Col>
            <Col span={8}>
              <CardSummary icon={<PieChartOutlined />} title='Total Sold' value={data?.sold || 0} />
            </Col>
            <Col span={8}>
              <CardSummary
                icon={<CommentOutlined />}
                title='Review'
                value={`${data?.review?.total ?? 0} . ${data?.review?.rating ?? 0}`}
                href={`/product/review/${data?.id}`}
              />
            </Col>
          </Row>
        )}

        <Form form={formInstance} id='form-product' layout='vertical' onFinish={handleFinish} autoComplete='off'>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>

          <Row gutter={24}>
            <Col span={15}>
              <Collapse
                expandIconPosition='end'
                expandIcon={() => <DownOutlined />}
                defaultActiveKey={['general', 'price']}
                items={[
                  {
                    key: 'general',
                    label: 'General Information',
                    children: (
                      <GeneralInformation
                        viewOnly={viewOnly}
                        featureEnabled={featureEnabled}
                        setFeatureEnabled={setFeatureEnabled}
                        data={data}
                        formInstance={formInstance}
                      />
                    )
                  },
                  {
                    key: 'price',
                    label: 'Price and Stock',
                    children: (
                      <PriceAndStock
                        tabKey={tabKey}
                        setTabKey={setTabKey}
                        viewOnly={viewOnly}
                        formInstance={formInstance}
                        memberPrice={memberPrice}
                        dealerPrice={dealerPrice}
                        discountHook={discountHook}
                        manageStockEnabled={manageStockEnabled}
                        setManageStockEnabled={setManageStockEnabled}
                        colorOptions={colorOptions}
                        data={data}
                        notify={notify}
                        attributesHook={attributesHook}
                        variantsHook={variantsHook}
                        groupImagesHook={groupImagesHook}
                      />
                    )
                  }
                ]}
              />
            </Col>

            <Col span={9}>
              <Sidebar
                viewOnly={viewOnly}
                categoryTreeOptions={categoryTreeOptions}
                brandTreeOptions={brandTreeOptions}
                colorTreeOptions={colorTreeOptions}
                promotionTreeOptions={promotionTreeOptions}
              />
            </Col>
          </Row>

          <Form.Item shouldUpdate className='floating-btn'>
            <Space size={16}>
              <Link href='/product'>
                <Button color='primary' variant='outlined'>
                  Cancel
                </Button>
              </Link>
              {viewOnly ? (
                <Button type='primary' htmlType='button' onClick={handleEnableForm}>
                  Edit
                </Button>
              ) : (
                <Button type='primary' htmlType='submit' form='form-product' loading={loading}>
                  Save
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>

        {slug && (
          <CardUserLog
            created_by={data?.created_by}
            updated_by={data?.updated_by}
            created_at={data?.created_at}
            updated_at={data?.updated_at}
          />
        )}
      </section>
    </>
  );
};

export default ProductFormView;
