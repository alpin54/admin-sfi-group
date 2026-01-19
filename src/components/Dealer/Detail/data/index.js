import profileImage from '@assets/image/dummy/profile.svg';
import ktpImage from '@assets/image/dummy/ktp.jpg';
import shippingImage from '@assets/image/dummy/jne.svg';
import paymentImage from '@assets/image/dummy/bca.svg';

const data = {
  data: {
    image: profileImage.src,
    name: 'Alex Putra',
    phone: '+62 812 3456 7890',
    email: 'alex@gmail.com',
    date_of_birth: '2000-01-22T12:40:04.648Z',
    gender: 'Male',
    dealer_name: 'Dealer Alex',
    dealer_code: 'DLR-0001',
    address: 'Jl. Melati No. 12, Kalideres, Jakarta Barat',
    ktp_image: ktpImage.src,
    npwp_image: ktpImage.src,
    created_at: '2026-01-22T12:40:04.648Z',
    updated_at: '2026-02-10T09:20:15.123Z',
    addresses: [
      {
        id: 1,
        label: 'Home',
        name: 'Alex Putra',
        phone: '+62 812 3456 7890',
        email: 'alex@gmail.com',
        province_id: 6,
        province_name: 'DKI Jakarta',
        city_id: 151,
        city_name: 'Jakarta Barat',
        district_id: 2089,
        district_name: 'Kalideres',
        subdistrict_id: 17480,
        subdistrict_name: 'Kalideres',
        postal_code: '12430',
        address: 'Jl. Melati No. 12',
        is_default: true
      },
      {
        id: 2,
        label: 'Office',
        name: 'Alex Putra',
        phone: '+62 812 3456 7890',
        email: 'alex@gmail.com',
        province_id: 6,
        province_name: 'DKI Jakarta',
        city_id: 151,
        city_name: 'Jakarta Barat',
        district_id: 2089,
        district_name: 'Kalideres',
        subdistrict_id: 17482,
        subdistrict_name: 'Pegadungan',
        postal_code: '12430',
        address: 'Jl. Kenanga No. 34',
        is_default: false
      }
    ]
  },
  account: {
    password_updated: '2 Dec 2024',
    shipping_count: 2
  },
  summary: [
    {
      order: {
        total: 20,
        previous: 0,
        percentage_change: 2
      },
      revenue: {
        total: 7500000,
        previous: 0,
        percentage_change: 12
      },
      payment: {
        total: 20
      },
      packaging: {
        total: 12
      },
      shipping: {
        total: 8
      },
      delivered: {
        total: 40
      },
      cancelled: {
        total: 3
      }
    }
  ],
  list: [
    {
      id: 1,
      date: '2025-08-12 10:00:00',
      order_id: 'ORD-00001',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 1000000,
      status: 0
    },
    {
      id: 2,
      date: '2025-08-12 10:00:00',
      order_id: 'ORD-00001',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 3400000,
      status: 2
    },
    {
      id: 3,
      date: '2025-08-12 10:00:00',
      order_id: 'ORD-00001',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 1500000,
      status: 1
    },
    {
      id: 4,
      date: '2025-03-13 11:30:00',
      order_id: 'ORD-00002',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 750000,
      status: 4
    },
    {
      id: 5,
      date: '2025-03-13 12:00:00',
      order_id: 'ORD-00002',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 2200000,
      status: 3
    },
    {
      id: 6,
      date: '2025-03-14 09:45:00',
      order_id: 'ORD-00003',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 1700000,
      status: 3
    },
    {
      id: 7,
      date: '2025-03-14 10:15:00',
      order_id: 'ORD-00003',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 900000,
      status: 3
    },
    {
      id: 8,
      date: '2025-03-15 14:00:00',
      order_id: 'ORD-00004',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 2500000,
      status: 3
    },
    {
      id: 9,
      date: '2025-03-15 15:30:00',
      order_id: 'ORD-00004',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 1200000,
      status: 3
    },
    {
      id: 10,
      date: '2025-03-16 13:00:00',
      order_id: 'ORD-00005',
      points: 21,
      shipping: shippingImage,
      payment: paymentImage,
      total: 650000,
      status: 3
    }
  ]
};

export default data;
