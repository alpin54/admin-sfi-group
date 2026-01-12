'use client';

// -- libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// -- models
// import signInModel from '@components/SignIn/models';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- views
import SignInView from '@components/SignIn/views';

// -- data
import data from '@components/SignIn/data';

const SignInWidget = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // const findFirstAccessibleRoute = (menuItems) => {
  //   if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
  //     return '/';
  //   }

  //   // Iterate through menu groups
  //   for (const group of menuItems) {
  //     if (group.menus && Array.isArray(group.menus)) {
  //       // Find first menu with can_view permission
  //       const accessibleMenu = group.menus.find((menu) => menu.can_view === true || menu.can_view === 1);

  //       if (accessibleMenu && accessibleMenu.route) {
  //         return accessibleMenu.route;
  //       }
  //     }
  //   }

  //   return '/';
  // };

  const handleSubmit = async (payload) => {
    setLoading(true);
    setMessage('');
    try {
      LocalStorage.set('user', data);
      router.push('/');
      // const { data, error } = await signInModel.submit(payload);

      // if (data) {
      //   const { data: sidebarData, error: sidebarError } = await signInModel.list(data.data.role_id, data.data.token);

      //   if (sidebarData) {
      //     const menuItems = sidebarData.data || sidebarData;
      //     const firstRoute = findFirstAccessibleRoute(menuItems);
      //     const userData = {
      //       ...data.data,
      //       menuItems: menuItems
      //     };
      //     LocalStorage.set('user', userData);
      //     router.push(firstRoute);

      //     return data;
      //   } else if (sidebarError) {
      //     setMessage(sidebarError.message || 'Failed to load menu items');
      //     return null;
      //   }

      //   return data;
      // } else if (error) {
      //   setMessage(error.message || 'Login failed');
      // } else {
      //   setMessage('Unexpected response from server');
      // }

      return null;
    } catch (err) {
      setMessage(err?.message || 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return <SignInView onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default SignInWidget;
