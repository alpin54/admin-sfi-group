// -- libraries
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Breadcrumb, Card, Row, Col, Button, Tag, Space, Timeline, Divider, Alert, Badge } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

// -- icons
import {
  CopyOutlined,
  ShoppingOutlined,
  TagOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined
} from '@ant-design/icons';

// -- assets
import shippingLogos from '@components/Order/Landing/data/shipping';
import paymentIcons from '@components/Order/Landing/data/payment';

// -- styles
import style from '@components/Order/Detail/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import LocalStorage from '@utils/localStorage';

// -- utils
import Currency from '@utils/currency';
import Clipboard from '@utils/clipboard';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';

// Helper function to get payment logo
const getPaymentLogo = (payments) => {
  if (!payments || payments.length === 0) return null;

  const payment = payments[0];
  const paymentMethod = payment.payment_method?.toLowerCase();

  // Check for Midtrans first
  if (paymentMethod === 'midtrans') {
    if (paymentIcons['midtrans']) {
      return paymentIcons['midtrans'];
    }

    if (payment.response_payload?.va_numbers && payment.response_payload.va_numbers.length > 0) {
      const bank = payment.response_payload.va_numbers[0].bank?.toLowerCase();
      const bankMap = {
        bca: 'bca',
        mandiri: 'mandiri',
        bni: 'bni',
        bri: 'bri',
        bsi: 'bsi',
        btn: 'btn',
        cimb: 'cimb-niaga',
        permata: 'permata',
        bjb: 'bjb'
      };

      if (bank && bankMap[bank] && paymentIcons[bankMap[bank]]) {
        return paymentIcons[bankMap[bank]];
      }
    }

    if (payment.response_payload?.payment_type) {
      const paymentType = payment.response_payload.payment_type.toLowerCase();
      if (paymentType === 'qris' && paymentIcons['qris']) {
        return paymentIcons['qris'];
      }
      if (paymentType === 'echannel' && paymentIcons['mandiri']) {
        return paymentIcons['mandiri'];
      }
    }
  }

  if (payment.response_payload?.bank_code) {
    const bankCode = payment.response_payload.bank_code.toLowerCase();
    const bankMap = {
      bca: 'bca',
      mandiri: 'mandiri',
      bni: 'bni',
      bri: 'bri',
      bsi: 'bsi',
      btn: 'btn',
      cimb: 'cimb-niaga',
      permata: 'permata',
      bjb: 'bjb',
      sahabat_sampoerna: 'bank-sahabat-sampoerna'
    };

    if (bankMap[bankCode] && paymentIcons[bankMap[bankCode]]) {
      return paymentIcons[bankMap[bankCode]];
    }
  }

  if (payment.response_payload?.ewallet_type) {
    const ewalletType = payment.response_payload.ewallet_type.toLowerCase();
    const ewalletMap = {
      dana: 'dana',
      ovo: 'ovo',
      gopay: 'gopay',
      linkaja: 'linkaja',
      shopeepay: 'shopee-pay',
      grabpay: 'grab-pay',
      astrapay: 'astra-pay'
    };

    if (ewalletMap[ewalletType] && paymentIcons[ewalletMap[ewalletType]]) {
      return paymentIcons[ewalletMap[ewalletType]];
    }
  }

  if (payment.response_payload?.payment_channel) {
    const channel = payment.response_payload.payment_channel.toLowerCase();
    const channelMap = {
      bca: 'bca',
      mandiri: 'mandiri',
      bni: 'bni',
      bri: 'bri',
      permata: 'permata',
      cimb: 'cimb-niaga'
    };

    if (channelMap[channel] && paymentIcons[channelMap[channel]]) {
      return paymentIcons[channelMap[channel]];
    }
  }

  const methodMap = {
    qris: 'qris',
    credit_card: 'visa',
    virtual_account: 'bca',
    ewallet: 'gopay',
    bank_transfer: 'bca'
  };

  if (paymentMethod && methodMap[paymentMethod] && paymentIcons[methodMap[paymentMethod]]) {
    return paymentIcons[methodMap[paymentMethod]];
  }

  return null;
};

// Helper function to get shipping logo
const getShippingLogo = (shipments) => {
  if (!shipments || shipments.length === 0) return null;

  const shipment = shipments[0];
  const courier = shipment.courier?.toLowerCase() || '';

  const courierCode = courier.split('|')[0].trim();

  const courierMap = {
    jne: 'jne',
    jnt: 'j&t-express',
    'j&t': 'j&t-express',
    sicepat: 'sicepat-ekspres',
    tiki: 'tiki',
    pos: 'pos-indonesia',
    anteraja: 'anteraja',
    ninja: 'ninja-xpress',
    lion: 'lion-parcel',
    sap: 'sap-express',
    wahana: 'wahana-express',
    rpx: 'rpx',
    rex: 'rex',
    spx: 'spx-express',
    id: 'id-express',
    pcp: 'pcp-express',
    esl: 'esl-express',
    lalamove: 'lalamove',
    first: 'first-logistic',
    pandu: 'pandu-logistics'
  };

  if (courierMap[courierCode] && shippingLogos[courierMap[courierCode]]) {
    return shippingLogos[courierMap[courierCode]];
  }

  return null;
};

const OrderDetailView = (props) => {
  const { slug, action, data, loading, message, refetch, onToShipping, onCancel } = props;
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { confirm, contextHolder: confirmationHolder } = useConfirmationModal();
  const router = useRouter();
  const user = LocalStorage.get('user');
  const order = data || {};

  const [products, setProducts] = useState(order?.items || []);

  // Get dynamic logos
  const paymentImage = useMemo(() => getPaymentLogo(order?.payments), [order?.payments]);
  const shippingImage = useMemo(() => getShippingLogo(order?.shipments), [order?.shipments]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `Data failed! `,
        description: message
      });
    }
  }, [message, notify]);

  useEffect(() => {
    setProducts(order?.items || []);
  }, [order?.items]);

  const handleCancelOrder = useCallback(
    (record) => {
      confirm({
        title: 'Cancel Order',
        icon: <CloseCircleOutlined />,
        content: `Are you sure you want to cancel ${record.order_code}?`,
        onSuccess: async () => {
          const payload = { id: record.id, status: 'CANCELLED', updated_by: user.id };
          const response = await onCancel(payload);

          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Order cancelled successfully`,
              onClose: () => {
                router.push('/order');
              }
            });
          } else {
            notify({
              type: 'error',
              message: response.error || 'Failed to cancel order'
            });
          }
        }
      });
    },
    [confirm, notify, onCancel, user, router]
  );

  const handleToShipping = useCallback(
    (record) => {
      confirm({
        title: 'Mark as Shipped',
        icon: <WarningOutlined />,
        content: `Are you sure you want to mark ${record.order_code} as shipped? `,
        onSuccess: async () => {
          const payload = { id: record.id, status: 'SHIPPED', updated_by: user.id };
          const response = await onToShipping(payload);

          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Order marked as shipped successfully`
            });
            refetch?.();
          } else {
            notify({
              type: 'error',
              message: response.error || 'Failed to mark order as shipped'
            });
          }
        }
      });
    },
    [confirm, notify, onToShipping, user, refetch]
  );

  // Helper to build a delivery address string
  const buildAddress = useCallback((addr) => {
    if (!addr) return '';
    const parts = [
      addr.address,
      addr.subdistrict_name ? `Kel.  ${addr.subdistrict_name}` : null,
      addr.district_name ? `Kec. ${addr.district_name}` : null,
      addr.city_name,
      addr.province_name,
      addr.postal_code
    ].filter(Boolean);
    return parts.join(', ');
  }, []);

  const orderCode = order?.order_code || '';
  const createdAt = order?.created_at ? dayjs(order.created_at).format('DD MMM YYYY, HH:mm') : '';

  // Get tracking/AWB number - prioritize tracking details
  const awbNumber = order?.tracking?.details?.awb || order?.shipments?.[0]?.tracking_number || '';
  const pickupNumber = order?.shipments?.[0]?.response_payload?.pickup_number || '';

  // Determine which number to display
  const displayTrackingNumber = awbNumber || pickupNumber;

  // Get payment method name with better formatting
  const getPaymentMethodName = () => {
    const payment = order?.payments?.[0];
    if (!payment) return '-';

    if (payment.payment_method?.toLowerCase() === 'midtrans') {
      if (payment.response_payload?.va_numbers && payment.response_payload.va_numbers.length > 0) {
        const bank = payment.response_payload.va_numbers[0].bank?.toUpperCase();
        return `${bank} Virtual Account`;
      }

      if (payment.response_payload?.payment_type) {
        const type = payment.response_payload.payment_type;
        if (type === 'bank_transfer') return 'Bank Transfer';
        if (type === 'qris') return 'QRIS';
        if (type === 'echannel') return 'Mandiri Bill';
        return type.replace(/_/g, ' ').toUpperCase();
      }

      return 'Midtrans';
    }

    if (payment.response_payload?.bank_code) {
      return payment.response_payload.bank_code.toUpperCase();
    }
    if (payment.response_payload?.ewallet_type) {
      return payment.response_payload.ewallet_type.toUpperCase();
    }
    if (payment.response_payload?.payment_channel) {
      return payment.response_payload.payment_channel.toUpperCase();
    }

    return payment.payment_method?.toUpperCase() || '-';
  };

  // Get courier name and service
  const getCourierInfo = () => {
    const trackingDetails = order?.tracking?.details;
    const shipment = order?.shipments?.[0];

    if (trackingDetails?.service) {
      return {
        name: trackingDetails.service,
        estimation: trackingDetails.estimation ? `${trackingDetails.estimation} days` : null
      };
    }

    if (shipment?.courier) {
      return {
        name: shipment.courier.replace('|', ' - ').trim(),
        estimation: null
      };
    }

    return { name: '-', estimation: null };
  };

  // Build variant display
  const buildVariantDisplay = (item) => {
    const parts = [];
    if (item.material_name) parts.push(item.material_name);
    if (item.color_name) parts.push(item.color_name);
    if (item.size_name) parts.push(item.size_name);
    return parts.length > 0 ? parts.join(' • ') : null;
  };

  const courierInfo = getCourierInfo();

  const statusMap = {
    PENDING: { label: 'Pending', color: 'error' },
    PROCESSING: { label: 'Processing', color: 'processing' },
    SHIPPED: { label: 'Shipped', color: 'warning' },
    DELIVERED: { label: 'Delivered', color: 'success' },
    CANCELLED: { label: 'Cancelled', color: 'default' },
    RETURNED: { label: 'Returned', color: 'red' }
  };
  const status = statusMap[order?.status] || { label: 'Unknown', color: 'error' };

  const roleMap = {
    Guest: { label: 'Guest', color: 'success' },
    Member: { label: 'Member', color: 'processing' },
    Dealer: { label: 'Dealer', color: 'warning' }
  };
  const role = roleMap[order?.customer?.role_name] || { label: 'Unknown', color: 'error' };

  return (
    <>
      {confirmationHolder}
      {notificationHolder}
      <section id='order-detail' className={style.sectionOrderDetail}>
        <Row gutter={[24, 24]} className='row-container' align='middle'>
          <Col span={12}>
            <Breadcrumb
              className={style.breadcrumb}
              items={[{ title: <Link href='/order'>Order</Link> }, { title: 'Order Details' }]}
            />
          </Col>
          <Col span={12} align='right'>
            <Space size={12}>
              {order?.status === 'PENDING' && (
                <Button size='small' danger onClick={() => handleCancelOrder(order)}>
                  Cancel Order
                </Button>
              )}
              {order?.status === 'PROCESSING' && (
                <Button size='small' type='primary' onClick={() => handleToShipping(order)}>
                  Mark as Shipped
                </Button>
              )}
              {order?.status === 'SHIPPED' && displayTrackingNumber && (
                <Button
                  size='small'
                  color='primary'
                  variant='outlined'
                  icon={<CopyOutlined />}
                  onClick={() => Clipboard.copyWithMessage(displayTrackingNumber)}>
                  {displayTrackingNumber}
                </Button>
              )}
            </Space>
          </Col>
          <Col span={24}>
            <Card>
              <Row gutter={[24, 24]} align='middle'>
                <Col span={12}>
                  <Space size={20}>
                    <Tag color={status.color}>{status.label}</Tag>
                    <Badge status={role.color} text={role.label} />
                    {/* <Tag color={order?.payment_status === 'PAID' ? 'success' : 'warning'}>
                      {order?.payment_status || 'PENDING'}
                    </Tag> */}
                  </Space>
                </Col>
                <Col span={12} align='right'>
                  <ul className={style.orderInfo}>
                    <li>
                      <ShoppingOutlined /> {orderCode}
                    </li>
                    <li>{createdAt}</li>
                  </ul>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={20} className='row-container'>
          <Col span={15}>
            <Row gutter={[0, 20]}>
              {/* Order Summary */}
              <Col span={24}>
                <Card className={style.card} title='Order Summary'>
                  {products.map((item, idx) => (
                    <div className={style.item} key={idx}>
                      <div className={style.img}>
                        <Image
                          src={item.image || '/placeholder.png'}
                          alt={item.name}
                          width={80}
                          height={80}
                          style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </div>
                      <div className={style.text}>
                        <p className={style.name}>{item.name}</p>
                        {buildVariantDisplay(item) && <p className={style.desc}>{buildVariantDisplay(item)}</p>}
                        <div className={style.price}>
                          <p className={style.priceQty}>{item.quantity} x</p>
                          <p className={style.priceText}>{Currency.formatRp(item.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Divider />
                  <Row gutter={[12, 12]} justify='space-between' align='middle'>
                    <Col span={12}>
                      <p className={style.desc}>Subtotal ({products.length} Item)</p>
                    </Col>
                    <Col span={12} align='right'>
                      <p className={style.desc}>{Currency.formatRp(order?.subtotal || 0)}</p>
                    </Col>
                    <Col span={12}>
                      <p className={style.desc}>Shipping Fee</p>
                    </Col>
                    <Col span={12} align='right'>
                      <p className={style.desc}>
                        {Currency.formatRp(order?.shipping_fee || Number(order?.shipments?.[0]?.shipment_cost) || 0)}
                      </p>
                    </Col>
                    {order?.discount > 0 && (
                      <>
                        <Col span={12}>
                          <p className={style.desc}>Discount</p>
                        </Col>
                        <Col span={12} align='right'>
                          <p className={style.desc}>-{Currency.formatRp(order?.discount || 0)}</p>
                        </Col>
                      </>
                    )}
                  </Row>
                  <Divider />
                  <Row gutter={[12, 12]} justify='space-between' align='middle'>
                    <Col span={12}>
                      <p className={style.desc}>
                        <strong>Total</strong>
                      </p>
                    </Col>
                    <Col span={12} align='right'>
                      <p className={style.desc}>
                        <strong>{Currency.formatRp(order?.total_amount || 0)}</strong>
                      </p>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Payment */}
              <Col span={24}>
                <Card className={style.card} title='Payment Information'>
                  <Row gutter={[12, 12]} justify='space-between' align='middle'>
                    <Col span={12}>
                      <Space align='center'>
                        {paymentImage ? (
                          <Image
                            src={paymentImage}
                            alt='Payment'
                            width={48}
                            height={32}
                            style={{ objectFit: 'cover' }}
                          />
                        ) : null}
                        <strong>{getPaymentMethodName()}</strong>
                      </Space>
                    </Col>
                    <Col span={12} align='right'>
                      <ul className={style.paymentInfo}>
                        <li>Total Payment: </li>
                        <li>
                          <strong>{Currency.formatRp(order?.total_amount || 0)}</strong>
                        </li>
                      </ul>
                    </Col>

                    {/* Show VA Number if available */}
                    {order?.payments?.[0]?.response_payload?.va_numbers?.[0]?.va_number && (
                      <>
                        <Col span={24}>
                          <Divider />
                        </Col>
                        <Col span={12}>
                          <p className={style.desc}>Virtual Account Number</p>
                        </Col>
                        <Col span={12} align='right'>
                          <Button
                            size='small'
                            type='text'
                            icon={<CopyOutlined />}
                            onClick={() =>
                              Clipboard.copyWithMessage(order.payments[0].response_payload.va_numbers[0].va_number)
                            }>
                            {order.payments[0].response_payload.va_numbers[0].va_number}
                          </Button>
                        </Col>
                      </>
                    )}

                    {/* Show paid date */}
                    {order?.payments?.[0]?.paid_at && (
                      <>
                        <Col span={12}>
                          <p className={style.desc}>Paid At</p>
                        </Col>
                        <Col span={12} align='right'>
                          <p className={style.desc}>{dayjs(order.payments[0].paid_at).format('DD MMM YYYY, HH:mm')}</p>
                        </Col>
                      </>
                    )}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Right Column */}
          <Col span={9}>
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card className={style.card} title='Shipping & Delivery'>
                  <Row gutter={[12, 24]} justify='space-between' align='middle'>
                    {/* Courier Info */}
                    <Col span={24}>
                      <p className={style.title}>Courier</p>
                      <Space direction='vertical' style={{ width: '100%' }}>
                        <Space align='center'>
                          {shippingImage && (
                            <Image
                              src={shippingImage}
                              alt='Shipping'
                              width={64}
                              height={32}
                              style={{ objectFit: 'cover' }}
                            />
                          )}
                          <span style={{ fontWeight: 500 }}>{courierInfo.name}</span>
                        </Space>
                        {courierInfo.estimation && (
                          <Tag icon={<CalendarOutlined />} color='blue'>
                            Est. {courierInfo.estimation}
                          </Tag>
                        )}
                      </Space>
                    </Col>

                    {/* Recipient */}
                    <Col span={24}>
                      <Divider />
                      <p className={style.title}>Recipient</p>
                      <ul className={style.list}>
                        <li>
                          <UserOutlined />
                          <span>{order?.shipping_address?.recipient_name || order?.customer?.name || '-'}</span>
                        </li>
                        <li>
                          <PhoneOutlined />
                          <span>{order?.shipping_address?.phone || order?.customer?.phone || '-'}</span>
                        </li>
                        {order?.customer?.email && (
                          <li>
                            <MailOutlined />
                            <span>{order.customer.email}</span>
                          </li>
                        )}
                      </ul>
                    </Col>

                    {/* Delivery Address */}
                    <Col span={24}>
                      <Divider />
                      <p className={style.title}>Delivery Address</p>
                      <ul className={style.list}>
                        <li>
                          <TagOutlined />
                          <span>{buildAddress(order?.shipping_address) || '-'}</span>
                        </li>
                      </ul>
                    </Col>

                    {/* Tracking Info */}
                    {order?.status === 'SHIPPED' && (
                      <>
                        <Col span={24}>
                          <Divider />

                          {/* Pickup Number */}
                          {pickupNumber && (
                            <div style={{ marginBottom: 16 }}>
                              <p className={style.title}>Pickup Number</p>
                              <Button
                                type='text'
                                icon={<CopyOutlined />}
                                onClick={() => Clipboard.copyWithMessage(pickupNumber)}
                                style={{ padding: 0 }}>
                                {pickupNumber}
                              </Button>
                            </div>
                          )}

                          {/* AWB/Tracking Number */}
                          {awbNumber && (
                            <div style={{ marginBottom: 16 }}>
                              <p className={style.title}>Tracking Number</p>
                              <Button
                                type='text'
                                icon={<CopyOutlined />}
                                onClick={() => Clipboard.copyWithMessage(awbNumber)}
                                style={{ padding: 0 }}>
                                {awbNumber}
                              </Button>
                            </div>
                          )}

                          {/* Tracking Status Message */}
                          {order?.tracking?.text && (
                            <Alert
                              message={order.tracking.text}
                              type={order.tracking.status ? 'info' : 'warning'}
                              showIcon
                              style={{ marginBottom: 16 }}
                            />
                          )}
                        </Col>

                        {/* Order Tracking Timeline */}
                        {order?.tracking?.histories && order.tracking.histories.length > 0 && (
                          <Col span={24}>
                            <div className={style.timeline}>
                              <p className={style.title}>Order Tracking</p>
                              <Timeline
                                mode='left'
                                items={order.tracking.histories.map((history) => ({
                                  color:
                                    history.status?.includes('diterima') || history.status === 'DELIVERED'
                                      ? 'green'
                                      : 'blue',
                                  label: (
                                    <>
                                      <p className='ant-timeline-desc'>{dayjs(history.created_at).format('HH:mm')}</p>
                                      <p className='ant-timeline-desc'>{dayjs(history.created_at).format('DD MMM')}</p>
                                    </>
                                  ),
                                  children: (
                                    <>
                                      <p className='ant-timeline-name'>
                                        <strong>{history.status}</strong>
                                      </p>
                                      {history.location && <p className='ant-timeline-desc'>{history.location}</p>}
                                      {history.driver && <p className='ant-timeline-desc'>Driver: {history.driver}</p>}
                                      {history.receiver && (
                                        <p className='ant-timeline-desc'>Received by: {history.receiver}</p>
                                      )}
                                    </>
                                  )
                                }))}
                              />
                            </div>
                          </Col>
                        )}
                      </>
                    )}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* User Log */}
        {slug && (
          <CardUserLog
            created_by={order?.created_by || 1}
            updated_by={order?.updated_by || 1}
            created_at={order?.created_at || '2025-08-15T06:06:51.338Z'}
            updated_at={order?.updated_at || order?.created_at || '2025-08-15T06:06:51.338Z'}
          />
        )}
      </section>
    </>
  );
};

export default OrderDetailView;
