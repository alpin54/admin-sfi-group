import productImage from '@assets/image/dummy/product-case.png';

const data = {
  data: {
    id: 32,
    order_code: 'UNW1766407204629',
    status: 'PROCESSING',
    subtotal: 3850000,
    shipping_fee: 41000,
    discount: 0,
    total_amount: 3891000,
    payment_status: 'PAID',
    note: null,
    items: [
      {
        id: 37,
        order_id: 32,
        product_id: 3,
        name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
        image: productImage,
        price: 3850000,
        quantity: 1,
        variant_id: 280,
        variant_name: null,
        material_id: 11,
        material_name: 'ZAAG',
        color_id: 22,
        color_name: 'Grey',
        size_id: 4,
        size_name: 'L',
        discount: 0,
        weight: 100,
        height: 5,
        width: 30,
        length: 20
      }
    ],
    customer: {
      id: 3,
      role_id: 1,
      role_name: 'Member',
      name: 'Member',
      email: 'member@gmail.com',
      phone: '0898989898'
    },
    voucher: null,
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
    ],
    shipping_address: {
      id: null,
      label: 'Home',
      recipient_name: 'Member',
      phone: '0898989898',
      province_id: 9,
      province_name: 'Jawa Barat',
      city_id: 211,
      city_name: 'Kuningan',
      district_id: 2954,
      district_name: 'Darma',
      subdistrict_id: 16462,
      subdistrict_name: 'Darma',
      postal_code: '45562',
      address: 'Jl. Desa Darma'
    },
    billing_address: {
      id: null,
      label: 'Home',
      recipient_name: 'Member',
      phone: '0898989898',
      province_id: 9,
      province_name: 'Jawa Barat',
      city_id: 211,
      city_name: 'Kuningan',
      district_id: 2954,
      district_name: 'Darma',
      subdistrict_id: 16462,
      subdistrict_name: 'Darma',
      postal_code: '45562',
      address: 'Jl. Desa Darma'
    },
    created_at: '2025-12-22T12:40:04.644Z',
    tracking: {
      status: false,
      text: 'Paket UNW1766407204629 tidak ditemukan. Silahkan periksa penulisan',
      method: 'shTracking'
    }
  }
};

export default data;
