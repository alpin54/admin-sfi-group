'use client';

// -- libary
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import Preloader from '@elements/Preloader/views';
import Empty from '@elements/Empty/views';

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const user = LocalStorage.get('user');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const token = user ? user.token : null;
    if (!token) {
      router.push('/sign-in');
    } else {
      setLoading(false);
    }
  }, [router, user]);

  if (loading) return <Preloader />;
  if (isMobile)
    return (
      <Empty
        icon={<WarningOutlined />}
        title='Not Supported on Mobile'
        description='Oops! This platform works best on a desktop or laptop. For the best experience, please access it using a computer.'
      />
    );
  return children;
}
