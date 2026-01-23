const data = {
  data: {
    unRead: [
      // ===== MEMBER =====
      {
        id: 1,
        type: 'order',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        total: 1900000,
        created_at: '2026-01-20T10:00:00Z',
        status: false
      },
      {
        id: 2,
        type: 'birthday',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        created_at: '2026-01-20T10:00:00Z',
        status: false
      },
      {
        id: 3,
        type: 'registration',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        created_at: '2026-01-20T10:00:00Z',
        status: false
      },
      {
        id: 4,
        type: 'message',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        created_at: '2026-01-20T10:00:00Z',
        status: false
      },

      // ===== DEALER =====
      {
        id: 5,
        type: 'order',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        total: 2750000,
        created_at: '2026-01-20T11:00:00Z',
        status: false
      },
      {
        id: 6,
        type: 'birthday',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: false
      },
      {
        id: 7,
        type: 'registration',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: false
      },
      {
        id: 8,
        type: 'message',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: false
      },
      {
        id: 9,
        type: 'uploaded',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: false
      },

      // ===== JOB APPLICATION (NO ROLE DEPENDENCY) =====
      {
        id: 10,
        type: 'job_application',
        name: 'Michael Johnson',
        email: 'michael@example.com',
        position: 'Customer Service',
        created_at: '2026-01-20T10:00:00Z',
        status: false
      }
    ],
    read: [
      // ===== MEMBER =====
      {
        id: 1,
        type: 'order',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        total: 1900000,
        created_at: '2026-01-20T10:00:00Z',
        status: true
      },
      {
        id: 2,
        type: 'birthday',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        created_at: '2026-01-20T10:00:00Z',
        status: true
      },
      {
        id: 3,
        type: 'registration',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        created_at: '2026-01-20T10:00:00Z',
        status: true
      },
      {
        id: 4,
        type: 'message',
        role_id: 1,
        role_name: 'Member',
        name: 'Jhon Doe',
        created_at: '2026-01-20T10:00:00Z',
        status: true
      },

      // ===== DEALER =====
      {
        id: 5,
        type: 'order',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        total: 2750000,
        created_at: '2026-01-20T11:00:00Z',
        status: true
      },
      {
        id: 6,
        type: 'birthday',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: true
      },
      {
        id: 7,
        type: 'registration',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: true
      },
      {
        id: 8,
        type: 'message',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: true
      },
      {
        id: 9,
        type: 'uploaded',
        role_id: 2,
        role_name: 'Dealer',
        name: 'Jane Smith',
        created_at: '2026-01-20T11:00:00Z',
        status: true
      },

      // ===== JOB APPLICATION (NO ROLE DEPENDENCY) =====
      {
        id: 10,
        type: 'job_application',
        name: 'Michael Johnson',
        email: 'michael@example.com',
        position: 'Customer Service',
        created_at: '2026-01-20T10:00:00Z',
        status: true
      }
    ]
  }
};

export default data;
