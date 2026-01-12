import shippingImage from '@assets/image/dummy/anteraja.svg';
import paymentImage from '@assets/image/dummy/bca.svg';
import productImage from '@assets/image/dummy/product.jpg';

const data = {
  widgetOrder: [
    {
      label: 'last 1 days',
      order: {
        total: 22,
        previous: 0,
        percentage_change: 8
      },
      revenue: {
        total: 15000000,
        previous: 0,
        percentage_change: 3
      },
      visitor: {
        total: 16000,
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
      }
    }
  ],
  chartWeakly: [
    {
      label: 'Sunday',
      Order: {
        value: 0,
        percentage_change: 0
      },
      Revenue: {
        value: 0,
        percentage_change: 0
      },
      Visitor: {
        value: 0,
        percentage_change: 0
      }
    },
    {
      label: 'Monday',
      Order: {
        value: 0,
        percentage_change: 0
      },
      Revenue: {
        value: 0,
        percentage_change: 0
      },
      Visitor: {
        value: 0,
        percentage_change: 0
      }
    },
    {
      label: 'Tuesday',
      Order: {
        value: 0,
        percentage_change: 0
      },
      Revenue: {
        value: 0,
        percentage_change: 0
      },
      Visitor: {
        value: 0,
        percentage_change: 0
      }
    },
    {
      label: 'Wednesday',
      Order: {
        value: 0,
        percentage_change: 0
      },
      Revenue: {
        value: 0,
        percentage_change: 0
      },
      Visitor: {
        value: 0,
        percentage_change: 0
      }
    },
    {
      label: 'Thursday',
      Order: {
        value: 0,
        percentage_change: 0
      },
      Revenue: {
        value: 0,
        percentage_change: 0
      },
      Visitor: {
        value: 0,
        percentage_change: 0
      }
    },
    {
      label: 'Friday',
      Order: {
        value: 0,
        percentage_change: 0
      },
      Revenue: {
        value: 0,
        percentage_change: 0
      },
      Visitor: {
        value: 0,
        percentage_change: 0
      }
    },
    {
      label: 'Saturday',
      Order: {
        value: 0,
        percentage_change: 0
      },
      Revenue: {
        value: 0,
        percentage_change: 0
      },
      Visitor: {
        value: 0,
        percentage_change: 0
      }
    }
  ],
  chartCustomer: {
    guest: 120,
    member: 120,
    dealer: 240
  },
  recentOrder: [
    {
      id: 32,
      order_code: 'UNW1766407204629',
      customer_id: 3,
      status: 'PROCESSING',
      subtotal: '3850000',
      shipping_fee: '41000',
      discount: '0',
      total_amount: '3891000',
      payment_status: 'PAID',
      note: null,
      created_at: '2025-12-22T12:40:04.644Z',
      updated_at: '2025-12-22T12:40:27.782Z',
      voucher_id: null,
      billing_address_id: 2,
      billing_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: null,
      deleted_by: null,
      shipping_address_id: 2,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 3,
        role_id: 2,
        role_name: 'Dealer',
        name: 'Member',
        email: 'member@gmail.com',
        date_of_birth: '1996-03-03T00:00:00.000Z',
        gender: 'Male',
        phone: '0898989898',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-02T09:32:31.668Z',
        updated_by: null,
        updated_at: '2025-12-04T06:49:38.495Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 37,
          order_id: 32,
          product_id: 3,
          variant_id: 280,
          material_id: 11,
          color_id: 22,
          size_id: 4,
          qty: 1,
          price: '3850000',
          discount: '0',
          weight: '100',
          width: '30',
          length: '20',
          height: '5',
          note: null,
          created_at: '2025-12-22T12:40:04.648Z',
          updated_at: '2025-12-22T12:40:04.648Z',
          price_snapshot: '3850000',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 32,
          order_id: 32,
          payment_method: 'bank_transfer',
          status: 'PAID',
          amount: '3891000',
          transaction_id: '4e469e27-c76c-41f2-bebf-a3c4bff18111',
          payment_token: 'f479a59e-155f-4fda-819f-7567dbd18742',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/f479a59e-155f-4fda-819f-7567dbd18742',
          response_payload: {
            currency: 'IDR',
            order_id: 'UNW1766407204629',
            va_numbers: [
              {
                bank: 'bni',
                va_number: '9888529071560587'
              }
            ],
            expiry_time: '2025-12-23 19:40:08',
            merchant_id: 'G641885290',
            status_code: '200',
            fraud_status: 'accept',
            gross_amount: '3891000.00',
            payment_type: 'bank_transfer',
            signature_key:
              '45dcc31fe2e367e635bfb527df448efa33d06f4340564e9c5fa4d1c524d3a91228d05e4dca2c1257943065d0f27d5564be1f4782f11c99fd402dc83e16432e73',
            status_message: 'midtrans payment notification',
            transaction_id: '4e469e27-c76c-41f2-bebf-a3c4bff18111',
            payment_amounts: [
              {
                amount: '3891000.00',
                paid_at: '2025-12-22 19:40:27'
              }
            ],
            settlement_time: '2025-12-22 19:40:27',
            customer_details: {},
            transaction_time: '2025-12-22 19:40:08',
            transaction_status: 'settlement'
          },
          paid_at: '2025-12-22T12:40:27.777Z',
          created_at: '2025-12-22T12:40:04.660Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 32,
          order_id: 32,
          courier: 'jnt | EZ',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '41000',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-22T12:40:04.811Z',
          courier_code: null
        }
      ]
    },
    {
      id: 31,
      order_code: 'UNW1766398723473',
      customer_id: 16,
      status: 'PROCESSING',
      subtotal: '158000',
      shipping_fee: '37000',
      discount: '0',
      total_amount: '195000',
      payment_status: 'PAID',
      note: null,
      created_at: '2025-12-22T10:18:43.484Z',
      updated_at: '2025-12-22T10:19:02.798Z',
      voucher_id: null,
      billing_address_id: 3,
      billing_address_snapshot: {
        label: 'Home',
        phone: '082121016443',
        address: 'Desa cikupa kecamatan darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Erwan Hermawan',
        subdistrict_id: 16459,
        subdistrict_name: 'Cikupa'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: null,
      deleted_by: null,
      shipping_address_id: 3,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '082121016443',
        address: 'Desa cikupa kecamatan darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Erwan Hermawan',
        subdistrict_id: 16459,
        subdistrict_name: 'Cikupa'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 16,
        role_id: 0,
        role_name: 'Guest',
        name: 'Erwan Hermawan',
        email: 'erwanhermawan858@gmail.com',
        date_of_birth: null,
        gender: 'Male',
        phone: '082121016443',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-05T10:07:12.710Z',
        updated_by: null,
        updated_at: '2025-12-08T11:54:11.797Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 36,
          order_id: 31,
          product_id: 11,
          variant_id: 243,
          material_id: 3,
          color_id: null,
          size_id: 2,
          qty: 1,
          price: '158000',
          discount: '0',
          weight: '300',
          width: '30',
          length: '20',
          height: '2',
          note: null,
          created_at: '2025-12-22T10:18:43.486Z',
          updated_at: '2025-12-22T10:18:43.486Z',
          price_snapshot: '158000',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 31,
          order_id: 31,
          payment_method: 'bank_transfer',
          status: 'PAID',
          amount: '195000',
          transaction_id: '138266c1-6cfd-4c16-bd4c-b9efcf64fdda',
          payment_token: '627d42fa-689d-439b-afef-da175f843c48',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/627d42fa-689d-439b-afef-da175f843c48',
          response_payload: {
            currency: 'IDR',
            order_id: 'UNW1766398723473',
            va_numbers: [
              {
                bank: 'bca',
                va_number: '85290194151329250866949'
              }
            ],
            expiry_time: '2025-12-23 17:18:48',
            merchant_id: 'G641885290',
            status_code: '200',
            fraud_status: 'accept',
            gross_amount: '195000.00',
            payment_type: 'bank_transfer',
            signature_key:
              '8bd9057469d99171a9817776d8f90ecc468f0ceb0179b915518fa11cd2d64b91fe322195d42b069342d801503205e12d71c71f8d5d4279bb1e411e97e2732d63',
            status_message: 'midtrans payment notification',
            transaction_id: '138266c1-6cfd-4c16-bd4c-b9efcf64fdda',
            payment_amounts: [],
            settlement_time: '2025-12-22 17:19:02',
            customer_details: {},
            transaction_time: '2025-12-22 17:18:48',
            transaction_status: 'settlement'
          },
          paid_at: '2025-12-22T10:19:02.793Z',
          created_at: '2025-12-22T10:18:43.495Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 31,
          order_id: 31,
          courier: 'jne | REG23',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '37000',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-22T10:18:43.614Z',
          courier_code: null
        }
      ]
    },
    {
      id: 30,
      order_code: 'UNW1766398077080',
      customer_id: 16,
      status: 'PROCESSING',
      subtotal: '350000',
      shipping_fee: '41000',
      discount: '0',
      total_amount: '391000',
      payment_status: 'PAID',
      note: null,
      created_at: '2025-12-22T10:07:57.090Z',
      updated_at: '2025-12-22T10:08:15.873Z',
      voucher_id: null,
      billing_address_id: 3,
      billing_address_snapshot: {
        label: 'Home',
        phone: '082121016443',
        address: 'Desa cikupa kecamatan darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Erwan Hermawan',
        subdistrict_id: 16459,
        subdistrict_name: 'Cikupa'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: null,
      deleted_by: null,
      shipping_address_id: 3,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '082121016443',
        address: 'Desa cikupa kecamatan darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Erwan Hermawan',
        subdistrict_id: 16459,
        subdistrict_name: 'Cikupa'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 16,
        role_id: 1,
        role_name: 'Member',
        name: 'Erwan Hermawan',
        email: 'erwanhermawan858@gmail.com',
        date_of_birth: null,
        gender: 'Male',
        phone: '082121016443',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-05T10:07:12.710Z',
        updated_by: null,
        updated_at: '2025-12-08T11:54:11.797Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 35,
          order_id: 30,
          product_id: 9,
          variant_id: null,
          material_id: null,
          color_id: null,
          size_id: null,
          qty: 1,
          price: '350000',
          discount: '0',
          weight: '300',
          width: '30',
          length: '20',
          height: '5',
          note: null,
          created_at: '2025-12-22T10:07:57.092Z',
          updated_at: '2025-12-22T10:07:57.092Z',
          price_snapshot: '350000',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 30,
          order_id: 30,
          payment_method: 'bank_transfer',
          status: 'PAID',
          amount: '391000',
          transaction_id: '3203862f-c7d9-4e9b-b1f2-b79908c201ea',
          payment_token: '02f150a3-3308-46b4-b676-9d94dcbea64f',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/02f150a3-3308-46b4-b676-9d94dcbea64f',
          response_payload: {
            currency: 'IDR',
            order_id: 'UNW1766398077080',
            va_numbers: [
              {
                bank: 'bca',
                va_number: '85290635149519960830110'
              }
            ],
            expiry_time: '2025-12-23 17:08:04',
            merchant_id: 'G641885290',
            status_code: '200',
            fraud_status: 'accept',
            gross_amount: '391000.00',
            payment_type: 'bank_transfer',
            signature_key:
              '6f0fe365046c0431ba37f468535e608bf72e29267c0f3b80f3a1ce8fc97a89330ba2c5a3541fa3a22657d53b6702073ce7c4d172fc08a39ec507680a3898966a',
            status_message: 'midtrans payment notification',
            transaction_id: '3203862f-c7d9-4e9b-b1f2-b79908c201ea',
            payment_amounts: [],
            settlement_time: '2025-12-22 17:08:15',
            customer_details: {},
            transaction_time: '2025-12-22 17:08:04',
            transaction_status: 'settlement'
          },
          paid_at: '2025-12-22T10:08:15.868Z',
          created_at: '2025-12-22T10:07:57.102Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 30,
          order_id: 30,
          courier: 'jnt | EZ',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '41000',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-22T10:07:57.216Z',
          courier_code: null
        }
      ]
    },
    {
      id: 29,
      order_code: 'UNW1766397845546',
      customer_id: 16,
      status: 'PENDING',
      subtotal: '350000',
      shipping_fee: '37000',
      discount: '0',
      total_amount: '387000',
      payment_status: 'UNPAID',
      note: null,
      created_at: '2025-12-22T10:04:05.559Z',
      updated_at: '2025-12-22T10:04:05.561Z',
      voucher_id: null,
      billing_address_id: 3,
      billing_address_snapshot: {
        label: 'Home',
        phone: '082121016443',
        address: 'Desa cikupa kecamatan darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Erwan Hermawan',
        subdistrict_id: 16459,
        subdistrict_name: 'Cikupa'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: null,
      deleted_by: null,
      shipping_address_id: 3,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '082121016443',
        address: 'Desa cikupa kecamatan darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Erwan Hermawan',
        subdistrict_id: 16459,
        subdistrict_name: 'Cikupa'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 16,
        role_id: 1,
        role_name: 'Member',
        name: 'Erwan Hermawan',
        email: 'erwanhermawan858@gmail.com',
        date_of_birth: null,
        gender: 'Male',
        phone: '082121016443',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-05T10:07:12.710Z',
        updated_by: null,
        updated_at: '2025-12-08T11:54:11.797Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 34,
          order_id: 29,
          product_id: 9,
          variant_id: null,
          material_id: null,
          color_id: null,
          size_id: null,
          qty: 1,
          price: '350000',
          discount: '0',
          weight: '300',
          width: '30',
          length: '20',
          height: '5',
          note: null,
          created_at: '2025-12-22T10:04:05.561Z',
          updated_at: '2025-12-22T10:04:05.561Z',
          price_snapshot: '350000',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 29,
          order_id: 29,
          payment_method: 'midtrans',
          status: 'PENDING',
          amount: '387000',
          transaction_id: null,
          payment_token: '6dcf491a-f2f7-437c-b536-5635606e1007',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/6dcf491a-f2f7-437c-b536-5635606e1007',
          response_payload: {
            token: '6dcf491a-f2f7-437c-b536-5635606e1007',
            redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/6dcf491a-f2f7-437c-b536-5635606e1007'
          },
          paid_at: null,
          created_at: '2025-12-22T10:04:05.570Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 29,
          order_id: 29,
          courier: 'jne | REG23',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '37000',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-22T10:04:05.757Z',
          courier_code: null
        }
      ]
    },
    {
      id: 28,
      order_code: 'UNW1766397379180',
      customer_id: 3,
      status: 'PROCESSING',
      subtotal: '1500000',
      shipping_fee: '348000',
      discount: '0',
      total_amount: '1848000',
      payment_status: 'PAID',
      note: null,
      created_at: '2025-12-22T09:56:19.185Z',
      updated_at: '2025-12-22T09:56:49.555Z',
      voucher_id: null,
      billing_address_id: 2,
      billing_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: null,
      deleted_by: null,
      shipping_address_id: 2,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 3,
        role_id: 2,
        role_name: 'Dealer',
        name: 'Member',
        email: 'member@gmail.com',
        date_of_birth: '1996-03-03T00:00:00.000Z',
        gender: 'Male',
        phone: '0898989898',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-02T09:32:31.668Z',
        updated_by: null,
        updated_at: '2025-12-04T06:49:38.495Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 33,
          order_id: 28,
          product_id: 15,
          variant_id: 302,
          material_id: 9,
          color_id: null,
          size_id: 4,
          qty: 1,
          price: '1500000',
          discount: '0',
          weight: '10',
          width: '20',
          length: '30',
          height: '200',
          note: null,
          created_at: '2025-12-22T09:56:19.187Z',
          updated_at: '2025-12-22T09:56:19.187Z',
          price_snapshot: '1500000',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 28,
          order_id: 28,
          payment_method: 'bank_transfer',
          status: 'PAID',
          amount: '1848000',
          transaction_id: 'c8e3a947-d122-4027-a1d3-29da31745f5d',
          payment_token: '09b62316-51f5-488f-af4c-7167d7853cf8',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/09b62316-51f5-488f-af4c-7167d7853cf8',
          response_payload: {
            currency: 'IDR',
            order_id: 'UNW1766397379180',
            va_numbers: [
              {
                bank: 'bni',
                va_number: '9888529026483631'
              }
            ],
            expiry_time: '2025-12-23 16:56:40',
            merchant_id: 'G641885290',
            status_code: '200',
            fraud_status: 'accept',
            gross_amount: '1848000.00',
            payment_type: 'bank_transfer',
            signature_key:
              '82278428d256287deec064abb9378f65a6e61a41d90dedbd2bea51368a894ff2c7a5e3ef18107428f6c27ac41de0d4c1eccd9492eb87e72dc39a9995164c4f94',
            status_message: 'midtrans payment notification',
            transaction_id: 'c8e3a947-d122-4027-a1d3-29da31745f5d',
            payment_amounts: [
              {
                amount: '1848000.00',
                paid_at: '2025-12-22 16:56:49'
              }
            ],
            settlement_time: '2025-12-22 16:56:49',
            customer_details: {},
            transaction_time: '2025-12-22 16:56:40',
            transaction_status: 'settlement'
          },
          paid_at: '2025-12-22T09:56:49.549Z',
          created_at: '2025-12-22T09:56:19.196Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 28,
          order_id: 28,
          courier: 'jne | JTR23',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '348000',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-22T09:56:19.359Z',
          courier_code: null
        }
      ]
    },
    {
      id: 27,
      order_code: 'UNW1766390377170',
      customer_id: 3,
      status: 'PENDING',
      subtotal: '3300203',
      shipping_fee: '1493500',
      discount: '0',
      total_amount: '4793703',
      payment_status: 'FAILED',
      note: null,
      created_at: '2025-12-22T07:59:37.180Z',
      updated_at: '2025-12-22T08:16:30.077Z',
      voucher_id: null,
      billing_address_id: 2,
      billing_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: null,
      deleted_by: null,
      shipping_address_id: 2,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 3,
        role_id: 0,
        role_name: 'Guest',
        name: 'Member',
        email: 'member@gmail.com',
        date_of_birth: '1996-03-03T00:00:00.000Z',
        gender: 'Male',
        phone: '0898989898',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-02T09:32:31.668Z',
        updated_by: null,
        updated_at: '2025-12-04T06:49:38.495Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 32,
          order_id: 27,
          product_id: 16,
          variant_id: 314,
          material_id: 8,
          color_id: 17,
          size_id: null,
          qty: 1,
          price: '3300203',
          discount: '0',
          weight: '100',
          width: '29',
          length: '59',
          height: '299',
          note: null,
          created_at: '2025-12-22T07:59:37.183Z',
          updated_at: '2025-12-22T07:59:37.183Z',
          price_snapshot: '3300203',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 27,
          order_id: 27,
          payment_method: 'qris',
          status: 'FAILED',
          amount: '4793703',
          transaction_id: '90fd4ca2-5199-4d9e-95cf-7e76555000d3',
          payment_token: '55f7fb17-1630-4d12-b1b0-b09518c2fd95',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/55f7fb17-1630-4d12-b1b0-b09518c2fd95',
          response_payload: {
            acquirer: 'airpay shopee',
            currency: 'IDR',
            metadata: {},
            order_id: 'UNW1766390377170',
            expiry_time: '2025-12-22 15:15:29',
            merchant_id: 'G641885290',
            status_code: '202',
            fraud_status: 'accept',
            gross_amount: '4793703.00',
            payment_type: 'qris',
            reference_id: 'QR1766390429725k5Dge5DzHz',
            signature_key:
              'd07985facd731ef6ccfb60b5fb9161a5d687e0023b3f4c36f318c618b921d4d00bf8b9bf70c7558a0da932cdc81a7f3870c131b8e263cf7f02cadb45ee401ccf',
            status_message: 'midtrans payment notification',
            transaction_id: '90fd4ca2-5199-4d9e-95cf-7e76555000d3',
            customer_details: {},
            transaction_time: '2025-12-22 15:00:29',
            transaction_type: 'off-us',
            transaction_status: 'expire'
          },
          paid_at: null,
          created_at: '2025-12-22T07:59:37.194Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 27,
          order_id: 27,
          courier: 'jne | JTR23',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '1493500',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-22T07:59:37.344Z',
          courier_code: null
        }
      ]
    },
    {
      id: 26,
      order_code: 'UNW1766390262672',
      customer_id: 3,
      status: 'PENDING',
      subtotal: '105000',
      shipping_fee: '145000',
      discount: '0',
      total_amount: '250000',
      payment_status: 'FAILED',
      note: null,
      created_at: '2025-12-22T07:57:42.690Z',
      updated_at: '2025-12-22T08:14:18.158Z',
      voucher_id: null,
      billing_address_id: 2,
      billing_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: null,
      deleted_by: null,
      shipping_address_id: 2,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 3,
        role_id: 1,
        role_name: 'Member',
        name: 'Member',
        email: 'member@gmail.com',
        date_of_birth: '1996-03-03T00:00:00.000Z',
        gender: 'Male',
        phone: '0898989898',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-02T09:32:31.668Z',
        updated_by: null,
        updated_at: '2025-12-04T06:49:38.495Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 31,
          order_id: 26,
          product_id: 6,
          variant_id: 241,
          material_id: 2,
          color_id: 1,
          size_id: 2,
          qty: 1,
          price: '105000',
          discount: '0',
          weight: '10',
          width: '20',
          length: '40',
          height: '50',
          note: null,
          created_at: '2025-12-22T07:57:42.692Z',
          updated_at: '2025-12-22T07:57:42.692Z',
          price_snapshot: '105000',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 26,
          order_id: 26,
          payment_method: 'qris',
          status: 'FAILED',
          amount: '250000',
          transaction_id: 'c858d9a3-4af2-4fbe-8a63-a6f6f77ac405',
          payment_token: '005da1ad-c58f-4ef7-b54a-794a2eaec87f',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/005da1ad-c58f-4ef7-b54a-794a2eaec87f',
          response_payload: {
            currency: 'IDR',
            order_id: 'UNW1766390262672',
            expiry_time: '2025-12-22 15:13:17',
            merchant_id: 'G641885290',
            status_code: '202',
            fraud_status: 'accept',
            gross_amount: '250000.00',
            payment_type: 'qris',
            signature_key:
              'e2b405bbc91c515a224e9b56d0a2eaf171265310fdc1e522f7820fcfb27ae90ff27a26354310750fbe15dd47765703ee5c92bc412c0fa713686da1bbc8cb85da',
            status_message: 'midtrans payment notification',
            transaction_id: 'c858d9a3-4af2-4fbe-8a63-a6f6f77ac405',
            customer_details: {},
            transaction_time: '2025-12-22 14:58:17',
            transaction_type: 'off-us',
            transaction_status: 'expire'
          },
          paid_at: null,
          created_at: '2025-12-22T07:57:42.708Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 26,
          order_id: 26,
          courier: 'jne | JTR23',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '145000',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-22T07:57:42.836Z',
          courier_code: null
        }
      ]
    },
    {
      id: 1,
      order_code: 'ORD1764668315747',
      customer_id: 3,
      status: 'CANCELLED',
      subtotal: '149900',
      shipping_fee: '37000',
      discount: '50000',
      total_amount: '136900',
      payment_status: 'UNPAID',
      note: null,
      created_at: '2025-12-02T09:38:35.757Z',
      updated_at: '2025-12-03T10:25:50.930Z',
      voucher_id: null,
      billing_address_id: 2,
      billing_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      billing_city: 'Kuningan',
      billing_postal_code: '45562',
      currency: 'USD',
      deleted_at: '2025-12-03T10:25:50.930Z',
      deleted_by: 1,
      shipping_address_id: 2,
      shipping_address_snapshot: {
        label: 'Home',
        phone: '0898989898',
        address: 'Jl. Desa Darma',
        city_id: 211,
        city_name: 'Kuningan',
        district_id: 2954,
        postal_code: '45562',
        province_id: 9,
        district_name: 'Darma',
        province_name: 'Jawa Barat',
        recipient_name: 'Member',
        subdistrict_id: 16462,
        subdistrict_name: 'Darma'
      },
      shipping_city: 'Kuningan',
      shipping_postal_code: '45562',
      version: 1,
      customer: {
        id: 3,
        role_id: 2,
        role_name: 'Dealer',
        name: 'Member',
        email: 'member@gmail.com',
        date_of_birth: '1996-03-03T00:00:00.000Z',
        gender: 'Male',
        phone: '0898989898',
        status: true,
        deleted_by: null,
        deleted_at: null,
        created_by: null,
        created_at: '2025-12-02T09:32:31.668Z',
        updated_by: null,
        updated_at: '2025-12-04T06:49:38.495Z',
        email_verified: true
      },
      voucher: null,
      items: [
        {
          id: 1,
          order_id: 1,
          product_id: 1,
          variant_id: null,
          material_id: 2,
          color_id: null,
          size_id: 1,
          qty: 1,
          price: '149900',
          discount: '50000',
          weight: '180',
          width: '0',
          length: '0',
          height: '0',
          note: null,
          created_at: '2025-12-02T09:38:35.759Z',
          updated_at: '2025-12-02T09:38:35.759Z',
          price_snapshot: '149900',
          product_name: '',
          sku: null
        }
      ],
      payments: [
        {
          id: 1,
          order_id: 1,
          payment_method: 'midtrans',
          status: 'PENDING',
          amount: '136900',
          transaction_id: null,
          payment_token: 'e4e4181a-2336-4371-8086-4fbb562328e2',
          redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/e4e4181a-2336-4371-8086-4fbb562328e2',
          response_payload: {
            token: 'e4e4181a-2336-4371-8086-4fbb562328e2',
            redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/e4e4181a-2336-4371-8086-4fbb562328e2'
          },
          paid_at: null,
          created_at: '2025-12-02T09:38:35.767Z',
          idempotency_key: null,
          refunded_amount: '0'
        }
      ],
      shipments: [
        {
          id: 1,
          order_id: 1,
          courier: 'jne | REG',
          tracking_number: '',
          status: 'PENDING',
          request_id: null,
          shipment_cost: '37000',
          weight: null,
          response_payload: null,
          shipped_at: null,
          delivered_at: null,
          created_at: '2025-12-02T09:38:36.031Z',
          courier_code: null
        }
      ]
    }
  ],
  topMember: [
    {
      customer_id: 1,
      customer: {
        id: 1,
        name: 'Jhon Doe'
      },
      points: 1500,
      orders_count: 15,
      total_spent: 15000000
    },
    {
      customer_id: 2,
      customer: {
        id: 2,
        name: 'Jane Smith'
      },
      points: 1400,
      orders_count: 12,
      total_spent: 12500000
    },
    {
      customer_id: 3,
      customer: {
        id: 3,
        name: 'Alice Brown'
      },
      points: 1300,
      orders_count: 10,
      total_spent: 9800000
    },
    {
      customer_id: 4,
      customer: {
        id: 4,
        name: 'Bob Johnson'
      },
      points: 1200,
      orders_count: 11,
      total_spent: 11700000
    },
    {
      customer_id: 5,
      customer: {
        id: 5,
        name: 'Charlie Lee'
      },
      points: 1100,
      orders_count: 13,
      total_spent: 11000000
    }
  ],
  topDealer: [
    {
      customer_id: 1,
      customer: {
        id: 1,
        name: 'Auto Parts Co.'
      },
      voucher: 8,
      orders_count: 50,
      total_spent: 50000000
    },
    {
      customer_id: 2,
      customer: {
        id: 2,
        name: 'Motor Supplies Ltd.'
      },
      voucher: 6,
      orders_count: 40,
      total_spent: 40000000
    },
    {
      customer_id: 3,
      customer: {
        id: 3,
        name: 'Car Essentials Inc.'
      },
      voucher: 7,
      orders_count: 45,
      total_spent: 45000000
    },
    {
      customer_id: 4,
      customer: {
        id: 4,
        name: 'Vehicle Parts Hub'
      },
      voucher: 5,
      orders_count: 35,
      total_spent: 35000000
    },
    {
      customer_id: 5,
      customer: {
        id: 5,
        name: 'Engine Care Store'
      },
      voucher: 4,
      orders_count: 30,
      total_spent: 30000000
    }
  ],
  topProduct: [
    {
      product_id: 1,
      product: {
        id: 1,
        image1: productImage,
        name: 'Performa Euro Syn SAE 5W-60'
      },
      total_quantity: 1,
      total_revenue: 3850000
    },
    {
      product_id: 2,
      product: {
        id: 2,
        image1: productImage,
        name: 'Super Lube Motor Oil 10W-40'
      },
      total_quantity: 27,
      total_revenue: 3500000
    },
    {
      product_id: 3,
      product: {
        id: 3,
        image1: productImage,
        name: 'Ultra Protect Diesel 15W-50'
      },
      total_quantity: 30,
      total_revenue: 3750000
    },
    {
      product_id: 4,
      product: {
        id: 4,
        image1: productImage,
        name: 'Eco Drive SAE 0W-20'
      },
      total_quantity: 22,
      total_revenue: 3200000
    },
    {
      product_id: 5,
      product: {
        id: 5,
        image1: productImage,
        name: 'Turbo Syn Engine Oil 5W-30'
      },
      total_quantity: 25,
      total_revenue: 3400000
    },
    {
      product_id: 6,
      product: {
        id: 6,
        image1: productImage,
        name: 'Maximum Power Gear Oil 80W-90'
      },
      total_quantity: 18,
      total_revenue: 2600000
    },
    {
      product_id: 7,
      product: {
        id: 7,
        image1: productImage,
        name: 'Advance Brake Fluid DOT 4'
      },
      total_quantity: 20,
      total_revenue: 2100000
    },
    {
      product_id: 8,
      product: {
        id: 8,
        image1: productImage,
        name: 'Performance ATF Dexron VI',
        total_item: 15,
        total: 1900000
      }
    }
  ],
  topPages: [
    { id: 1, page_name: 'Home', views: 200 },
    { id: 2, page_name: 'About Us', views: 120 },
    { id: 3, page_name: 'Product', views: 170 },
    { id: 4, page_name: 'Contact Us', views: 100 },
    { id: 5, page_name: 'Careers', views: 90 },
    { id: 6, page_name: 'FAQ', views: 80 },
    { id: 7, page_name: 'Promo', views: 60 }
  ]
};

export default data;
