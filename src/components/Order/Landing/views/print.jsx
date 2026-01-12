// -- libraries
import { Table } from 'antd';
import Barcode from 'react-barcode';
import Image from 'next/image';

// -- icons
import { PhoneOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';

// -- assets
import shippingLogos from '@components/Order/Landing/data/shipping';
import paymentIcons from '@components/Order/Landing/data/payment';
import logoImage from '@assets/image/logo/logo-primary.png';

// -- styles
import style from '@components/Order/Landing/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

// Helper function to get payment logo
export const getPaymentLogo = (payments) => {
  if (!payments || payments.length === 0) return null;

  const payment = payments[0];
  const paymentMethod = payment.payment_method;

  // Check for bank code in response_payload
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

  // Check for ewallet type
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

  // Check for payment channel
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

  // Fallback to generic payment method
  const methodMap = {
    QRIS: 'qris',
    CREDIT_CARD: 'visa',
    VIRTUAL_ACCOUNT: 'bca',
    EWALLET: 'gopay'
  };

  if (methodMap[paymentMethod] && paymentIcons[methodMap[paymentMethod]]) {
    return paymentIcons[methodMap[paymentMethod]];
  }

  return null;
};

// Helper function to get shipping logo
export const getShippingLogo = (shipments) => {
  if (!shipments || shipments.length === 0) return null;

  const shipment = shipments[0];
  const courier = shipment.courier?.toLowerCase() || '';

  // Extract courier code from "jne | REG23" format
  const courierCode = courier.split('|')[0].trim();

  // Map courier codes to shipping icon keys
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

const PrintLabel = ({ data }) => {
  if (!data) return null;

  // Extract common order fields
  const orderCode = data.order_code;
  const customer = data.customer || {};
  const shippingSnapshot = data.shipping_address_snapshot || {};
  const barcode = data.shipments && data.shipments[0] && data.shipments[0].tracking_number;
  const items = data.items || [];

  // Get logos
  const shippingImage = getShippingLogo(data.shipments);
  const paymentImage = getPaymentLogo(data.payments);

  // Sender info
  const sender = {
    name: 'Stellalunardy',
    phone: '+62 8226 0123 258',
    address:
      'Komplek Lucky, Jl. Duri Selatan I No.7, RT.14/RW.1, Duri Sel., Kec. Tambora, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11270'
  };

  // Prepare product table dataSource
  const dataSource = items.map((it, idx) => {
    const productName = (it.product && it.product.name) || it.product_name || 'Unknown product';
    const variantParts = [];
    if (it.variant?.sku) variantParts.push(it.variant.sku);
    if (it.material?.name) variantParts.push(it.material.name);
    if (it.color?.name) variantParts.push(it.color.name);
    if (it.size?.name) variantParts.push(it.size.name);
    const variantLabel = variantParts.join(' / ') || (it.variant && it.variant.id) || '-';

    const sku = it.sku || it.variant?.sku || it.product?.sku || '-';
    const qty = it.qty ?? '-';
    const price = it.price_snapshot || it.price || '-';

    return {
      key: `${idx + 1}`,
      product: productName,
      variant: variantLabel,
      sku,
      qty,
      price
    };
  });

  // Table columns
  const columns = [
    {
      title: 'Produk',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Variasi',
      dataIndex: 'variant',
      key: 'variant'
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku'
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center'
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (text) => Currency.formatRp(text)
    }
  ];

  return (
    <div className={style.printWrapper}>
      {/* Header - logos */}
      <div className={style.printHead}>
        <Image src={logoImage} alt='Logo' width={80} height={32} />
        {shippingImage && <Image src={shippingImage} alt='Shipping' width={80} height={32} />}
      </div>

      {/* Barcode */}
      <div className={style.printBarcode}>
        {barcode && barcode !== 'undefined' ? (
          <Barcode value={barcode} width={2} height={60} fontSize={14} />
        ) : (
          <span>No Tracking Number</span>
        )}
      </div>

      {/* Penerima & Pengirim */}
      <div className={style.printInfo}>
        <div className={style.printInfoItem}>
          <p className={style.printInfoTitle}>Penerima</p>
          <ul className={style.printInfoList}>
            <li>
              <UserOutlined />
              <span>{shippingSnapshot.recipient_name || customer?.name || '-'}</span>
            </li>
            <li>
              <PhoneOutlined />
              <span>{shippingSnapshot.phone || customer?.phone || '-'}</span>
            </li>
            <li>
              <EnvironmentOutlined />
              <span>
                {[
                  shippingSnapshot.subdistrict_name,
                  shippingSnapshot.district_name,
                  shippingSnapshot.city_name,
                  shippingSnapshot.province_name,
                  shippingSnapshot.postal_code,
                  shippingSnapshot.address
                ]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </li>
          </ul>
        </div>

        <div className={style.printInfoItem}>
          <p className={style.printInfoTitle}>Pengirim</p>
          <ul className={style.printInfoList}>
            <li>
              <UserOutlined />
              <span>{sender.name}</span>
            </li>
            <li>
              <PhoneOutlined />
              <span>{sender.phone}</span>
            </li>
            <li>
              <EnvironmentOutlined />
              <span>{sender.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Product Table */}
      <div className={style.printProduct}>
        <Table columns={columns} dataSource={dataSource} pagination={false} size='small' showHeader bordered={false} />
      </div>
    </div>
  );
};

export default PrintLabel;
