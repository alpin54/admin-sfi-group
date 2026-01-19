import ProfileImage from '@assets/image/dummy/profile.svg';

const data = {
  data: [
    {
      id: 6,
      name: 'tes',
      email: 'tes@gmail.com',
      role_id: 3,
      role_name: 'Admin Konten',
      image: ProfileImage,
      status: true,
      created_by: 4,
      created_at: '2025-12-20T06:49:26.974Z',
      updated_by: 0,
      updated_at: null
    },
    {
      id: 1,
      name: 'Admin',
      email: 'admin@gmail.com',
      role_id: 1,
      role_name: 'Super Admin',
      image: ProfileImage,
      status: true,
      created_by: 0,
      created_at: '2025-12-02T09:31:44.870Z',
      updated_by: 1,
      updated_at: '2025-12-02T09:34:48.401Z'
    },
    {
      id: 2,
      name: 'Admin Produk',
      email: 'adminproduk@gmail.com',
      role_id: 2,
      role_name: 'Admin Produk',
      image: ProfileImage,
      status: true,
      created_by: 0,
      created_at: '2025-12-02T09:31:44.870Z',
      updated_by: 0,
      updated_at: null
    },
    {
      id: 3,
      name: 'Admin Konten',
      email: 'adminkonten@gmail.com',
      role_id: 3,
      role_name: 'Admin Konten',
      image: ProfileImage,
      status: true,
      created_by: 0,
      created_at: '2025-12-02T09:31:44.870Z',
      updated_by: 0,
      updated_at: null
    },
    {
      id: 4,
      name: 'Admin',
      email: 'admincs@gmail.com',
      role_id: 1,
      role_name: 'Super Admin',
      image: ProfileImage,
      status: true,
      created_by: 0,
      created_at: '2025-12-02T09:31:44.870Z',
      updated_by: 1,
      updated_at: '2025-12-02T09:34:21.667Z'
    }
  ],
  role: {
    data: [
      {
        roleName: 'Super Admin',
        permissions: 'View, Edit, Add, Delete',
        status: true,
        role_id: 1,
        created_by: 0,
        created_at: '2025-12-02T09:31:44.489Z',
        updated_by: 0,
        updated_at: null
      },
      {
        roleName: 'Admin Produk',
        permissions: 'View, Edit, Add, Delete',
        status: true,
        role_id: 2,
        created_by: 0,
        created_at: '2025-12-02T09:31:44.489Z',
        updated_by: 0,
        updated_at: null
      },
      {
        roleName: 'Admin Konten',
        permissions: 'View, Edit, Add, Delete',
        status: true,
        role_id: 3,
        created_by: 0,
        created_at: '2025-12-02T09:31:44.489Z',
        updated_by: 0,
        updated_at: null
      },
      {
        roleName: 'Admin CS',
        permissions: 'View, Edit, Add, Delete',
        status: true,
        role_id: 4,
        created_by: 0,
        created_at: '2025-12-02T09:31:44.489Z',
        updated_by: 0,
        updated_at: null
      }
    ],
    total: 4,
    page: 1,
    limit: 10
  },
  total: 5,
  page: 1,
  limit: 10
};

export default data;
