import profileImage from '@assets/image/dummy/profile.svg';
import productImage from '@assets/image/dummy/product-case.png';

const data = {
  summary: {
    rating: {
      total: 5.0
    },
    review: {
      total: 729
    },
    stars: [
      {
        rating: 5,
        review: 500
      },
      {
        rating: 4,
        review: 150
      },
      {
        rating: 3,
        review: 50
      },
      {
        rating: 2,
        review: 20
      },
      {
        rating: 1,
        review: 9
      }
    ]
  },
  data: [
    {
      id: 1,
      customer: {
        image: profileImage.src,
        name: 'Jhon Doe',
        created_at: '2025-11-01T03:54:01.594Z'
      },
      rating: 5.0,
      review: 'Great product! Highly recommend it to everyone.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src, productImage.src],
      status: true,
      created_by: 1,
      created_at: '2025-11-01T03:54:01.594Z',
      updated_by: 1,
      updated_at: '2025-11-03T07:48:31.293Z'
    },
    {
      id: 2,
      customer: {
        image: profileImage.src,
        name: 'Jane Smith',
        created_at: '2025-11-02T10:20:15.000Z'
      },
      rating: 4,
      review: 'Good quality, but delivery was a bit slow.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src],
      status: true,
      created_by: 2,
      created_at: '2025-11-02T10:20:15.000Z',
      updated_by: 2,
      updated_at: '2025-11-04T08:30:00.000Z'
    },
    {
      id: 3,
      customer: {
        image: profileImage.src,
        name: 'Michael Johnson',
        created_at: '2025-11-03T12:45:30.000Z'
      },
      rating: 3,
      review: 'Average experience, product as described.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [],
      status: true,
      created_by: 3,
      created_at: '2025-11-03T12:45:30.000Z',
      updated_by: 3,
      updated_at: '2025-11-05T09:10:00.000Z'
    },
    {
      id: 4,
      customer: {
        image: profileImage.src,
        name: 'Emily Davis',
        created_at: '2025-11-04T14:10:45.000Z'
      },
      rating: 5,
      review: 'Absolutely love it! Will buy again.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src, productImage.src],
      status: true,
      created_by: 4,
      created_at: '2025-11-04T14:10:45.000Z',
      updated_by: 4,
      updated_at: '2025-11-06T10:00:00.000Z'
    },
    {
      id: 5,
      customer: {
        image: profileImage.src,
        name: 'Chris Lee',
        created_at: '2025-11-05T16:30:00.000Z'
      },
      rating: 2,
      review: 'Not satisfied, item arrived damaged.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [],
      status: false,
      created_by: 5,
      created_at: '2025-11-05T16:30:00.000Z',
      updated_by: 5,
      updated_at: '2025-11-07T11:20:00.000Z'
    },
    {
      id: 6,
      customer: {
        image: profileImage.src,
        name: 'Olivia Brown',
        created_at: '2025-11-06T18:00:00.000Z'
      },
      rating: 4,
      review: 'Nice product, met my expectations.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src],
      status: true,
      created_by: 6,
      created_at: '2025-11-06T18:00:00.000Z',
      updated_by: 6,
      updated_at: '2025-11-08T12:00:00.000Z'
    },
    {
      id: 7,
      customer: {
        image: profileImage.src,
        name: 'William Martinez',
        created_at: '2025-11-07T20:15:00.000Z'
      },
      rating: 1,
      review: 'Very disappointed, not as described.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [],
      status: false,
      created_by: 7,
      created_at: '2025-11-07T20:15:00.000Z',
      updated_by: 7,
      updated_at: '2025-11-09T13:30:00.000Z'
    },
    {
      id: 8,
      customer: {
        image: profileImage.src,
        name: 'Sophia Wilson',
        created_at: '2025-11-08T22:40:00.000Z'
      },
      rating: 5,
      review: 'Excellent! Fast shipping and great quality.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src],
      status: true,
      created_by: 8,
      created_at: '2025-11-08T22:40:00.000Z',
      updated_by: 8,
      updated_at: '2025-11-10T14:00:00.000Z'
    },
    {
      id: 9,
      customer: {
        image: profileImage.src,
        name: 'James Anderson',
        created_at: '2025-11-09T09:00:00.000Z'
      },
      rating: 3,
      review: 'It’s okay, nothing special.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [],
      status: true,
      created_by: 9,
      created_at: '2025-11-09T09:00:00.000Z',
      updated_by: 9,
      updated_at: '2025-11-11T15:10:00.000Z'
    },
    {
      id: 10,
      customer: {
        image: profileImage.src,
        name: 'Isabella Thomas',
        created_at: '2025-11-10T11:25:00.000Z'
      },
      rating: 4,
      review: 'Good value for the price.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src],
      status: true,
      created_by: 10,
      created_at: '2025-11-10T11:25:00.000Z',
      updated_by: 10,
      updated_at: '2025-11-12T16:00:00.000Z'
    },
    {
      id: 11,
      customer: {
        image: profileImage.src,
        name: 'Benjamin Taylor',
        created_at: '2025-11-11T13:50:00.000Z'
      },
      rating: 2,
      review: 'Did not meet my expectations.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [],
      status: false,
      created_by: 11,
      created_at: '2025-11-11T13:50:00.000Z',
      updated_by: 11,
      updated_at: '2025-11-13T17:20:00.000Z'
    },
    {
      id: 12,
      customer: {
        image: profileImage.src,
        name: 'Mia Moore',
        created_at: '2025-11-12T15:15:00.000Z'
      },
      rating: 5,
      review: 'Superb! Will recommend to friends.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src, productImage.src],
      status: true,
      created_by: 12,
      created_at: '2025-11-12T15:15:00.000Z',
      updated_by: 12,
      updated_at: '2025-11-14T18:00:00.000Z'
    },
    {
      id: 13,
      customer: {
        image: profileImage.src,
        name: 'Elijah Harris',
        created_at: '2025-11-13T17:40:00.000Z'
      },
      rating: 3,
      review: 'It’s decent for the price.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [],
      status: true,
      created_by: 13,
      created_at: '2025-11-13T17:40:00.000Z',
      updated_by: 13,
      updated_at: '2025-11-15T19:10:00.000Z'
    },
    {
      id: 14,
      customer: {
        image: profileImage.src,
        name: 'Charlotte Clark',
        created_at: '2025-11-14T19:05:00.000Z'
      },
      rating: 4,
      review: 'Happy with my purchase.',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src],
      status: true,
      created_by: 14,
      created_at: '2025-11-14T19:05:00.000Z',
      updated_by: 14,
      updated_at: '2025-11-16T20:00:00.000Z'
    },
    {
      id: 15,
      customer: {
        image: profileImage.src,
        name: 'Lucas Lewis',
        created_at: '2025-11-15T21:30:00.000Z'
      },
      rating: 5,
      review: 'Fantastic product and great service!',
      product: {
        name: 'Product Name',
        variant: [
          {
            name: 'Iphone 6'
          },
          {
            name: 'Black'
          }
        ]
      },
      images: [productImage.src, productImage.src],
      status: true,
      created_by: 15,
      created_at: '2025-11-15T21:30:00.000Z',
      updated_by: 15,
      updated_at: '2025-11-17T21:30:00.000Z'
    }
  ],
  total: 15
};

export default data;
