const data = {
  id: 1,
  name: 'Admin',
  email: 'admin@gmail.com',
  role_id: 1,
  role_name: 'Super Admin',
  image: 'https://api.stellalunardy.com/uploads/default.jpg',
  status: true,
  created_by: 0,
  created_at: '2025-12-02T09:31:44.870Z',
  updated_by: 1,
  updated_at: '2025-12-02T09:34:48.401Z',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlX2lkIjoxLCJpYXQiOjE3NjgxOTU2NDgsImV4cCI6MTc2ODI4MjA0OH0.FbjT9SuUnz2dywXpj3BH44H6FmGKd7kw8Uk4UDXzSMA',
  menuItems: [
    {
      id: 1,
      name: 'Dashboard',
      sorting: 1,
      menus: [
        {
          menu_id: 1,
          role_id: 1,
          icon: 'overview',
          name: 'Overview',
          route: '/',
          group_id: 1,
          sorting: 1,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 2,
          role_id: 1,
          icon: 'revenue',
          name: 'Revenue',
          route: '/revenue',
          group_id: 1,
          sorting: 2,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        }
      ]
    },
    {
      id: 2,
      name: 'Sales Management',
      sorting: 2,
      menus: [
        {
          menu_id: 3,
          role_id: 1,
          icon: 'order',
          name: 'Order',
          route: '/order',
          group_id: 2,
          sorting: 1,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 4,
          role_id: 1,
          icon: 'product',
          name: 'Product',
          route: '/product',
          group_id: 2,
          sorting: 2,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 5,
          role_id: 1,
          icon: 'voucher',
          name: 'Voucher',
          route: '/voucher',
          group_id: 2,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        }
      ]
    },
    {
      id: 3,
      name: 'User Management',
      sorting: 3,
      menus: [
        {
          menu_id: 6,
          role_id: 1,
          icon: 'guest',
          name: 'Guest',
          route: '/guest',
          group_id: 3,
          sorting: 2,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 7,
          role_id: 1,
          icon: 'member',
          name: 'Member',
          route: '/member',
          group_id: 3,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 8,
          role_id: 1,
          icon: 'dealer',
          name: 'Dealer',
          route: '/dealer',
          group_id: 3,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 9,
          role_id: 1,
          icon: 'member-rewards',
          name: 'Member Rewards',
          route: '/member-rewards',
          group_id: 3,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 10,
          role_id: 1,
          icon: 'dealer-rewards',
          name: 'Dealer Rewards',
          route: '/dealer-rewards',
          group_id: 3,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        }
      ]
    },
    {
      id: 4,
      name: 'Content Management',
      sorting: 4,
      menus: [
        {
          menu_id: 11,
          role_id: 1,
          icon: 'pages',
          name: 'Pages',
          route: '/pages',
          group_id: 4,
          sorting: 1,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 12,
          role_id: 1,
          icon: 'email',
          name: 'Email',
          route: '/email',
          group_id: 4,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 13,
          role_id: 1,
          icon: 'menu',
          name: 'Menu',
          route: '/menu',
          group_id: 4,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 14,
          role_id: 1,
          icon: 'footer',
          name: 'Footer',
          route: '/footer',
          group_id: 4,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 15,
          role_id: 1,
          icon: 'popup',
          name: 'Pop Up',
          route: '/popup',
          group_id: 4,
          sorting: 3,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 16,
          role_id: 1,
          icon: 'meta',
          name: 'Meta',
          route: '/meta',
          group_id: 4,
          sorting: 5,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        }
      ]
    },
    {
      id: 5,
      name: 'Form & Career',
      sorting: 5,
      menus: [
        {
          menu_id: 17,
          role_id: 1,
          icon: 'career',
          name: 'Career',
          route: '/career',
          group_id: 5,
          sorting: 1,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 18,
          role_id: 1,
          icon: 'form-submission',
          name: 'Form Submission',
          route: '/form-submission',
          group_id: 5,
          sorting: 2,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        }
      ]
    },
    {
      id: 6,
      name: 'Administration',
      sorting: 6,
      menus: [
        {
          menu_id: 19,
          role_id: 1,
          icon: 'admin',
          name: 'Admin',
          route: '/admin',
          group_id: 6,
          sorting: 1,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 20,
          role_id: 1,
          icon: 'user-log',
          name: 'User Log',
          route: '/user-log',
          group_id: 6,
          sorting: 2,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        },
        {
          menu_id: 21,
          role_id: 1,
          icon: 'notification',
          name: 'Notification',
          route: '/notification',
          group_id: 6,
          sorting: 2,
          is_navigation: true,
          can_view: true,
          can_create: true,
          can_edit: true,
          can_delete: true
        }
      ]
    }
  ]
};

export default data;
