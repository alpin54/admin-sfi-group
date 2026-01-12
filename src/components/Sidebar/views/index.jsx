'use client';

// -- libraries
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

// -- icons
import {
  LayoutOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagOutlined,
  DollarCircleOutlined,
  UserOutlined,
  FileDoneOutlined,
  AuditOutlined,
  CopyOutlined,
  CodeOutlined,
  UnorderedListOutlined,
  DownloadOutlined,
  EditOutlined,
  LogoutOutlined,
  UserAddOutlined,
  BgColorsOutlined,
  ClockCircleOutlined,
  MailOutlined,
  BookOutlined,
  WarningOutlined
} from '@ant-design/icons';

// -- assets
import LogoImage from '@assets/image/logo/logo-primary.png';

// -- styles
import style from '@components/Sidebar/styles/style.module.scss';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- icon map sesuai string icon di dashboard_data.js
const iconMap = {
  overview: <LayoutOutlined />,
  revenue: <DollarCircleOutlined />,
  order: <ShopOutlined />,
  product: <ShoppingOutlined />,
  voucher: <TagOutlined />,
  member: <UserAddOutlined />,
  pages: <CopyOutlined />,
  menu: <UnorderedListOutlined />,
  footer: <DownloadOutlined />,
  popup: <BgColorsOutlined />,
  meta: <CodeOutlined />,
  career: <AuditOutlined />,
  'form-submission': <FileDoneOutlined />,
  admin: <EditOutlined />,
  'user-log': <ClockCircleOutlined />,
  email: <MailOutlined />,
  subscriber: <BookOutlined />
};

const Sidebar = ({ data }) => {
  const { Sider } = Layout;
  const { menu } = useStateMenu();
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const router = useRouter();
  const pathname = usePathname();
  const token = LocalStorage.get('user') ? LocalStorage.get('user').token : null;
  const [openKeys, setOpenKeys] = useState([]);
  const isEditOrAdd = pathname?.includes('/add') || pathname?.includes('/edit');
  const { items, parentMap } = useMemo(() => {
    const parentMapLocal = {};

    const mapItem = (item) => {
      // key: gunakan route jika ada, kalau tidak gunakan fallback berbasis id
      const key = item.route && item.route !== '' ? item.route : `group-${item.id}`;

      const label =
        item.route && item.route !== '' ? (
          !isEditOrAdd ? (
            <Link href={item.route === '/dashboard' ? '/' : item.route}>{item.name}</Link>
          ) : (
            <a onClick={handleMenuClick(item.route)}>{item.name}</a>
          )
        ) : (
          <span>{item.name}</span>
        );

      const menuItem = {
        key,
        label,
        icon: iconMap[item.icon] || null
      };

      if (Array.isArray(item.menus) && item.menus.length > 0) {
        // Antd Menu expects 'children' for nested items when using items prop
        menuItem.children = item.menus.map((child) => {
          const childKey = child.route && child.route !== '' ? child.route : `item-${child.menu_id || child.id}`;
          // record parent relationship
          parentMapLocal[childKey] = key;

          const childLabel =
            child.route && child.route !== '' ? (
              // allow mapping homepage to overview if desired (ke href '/')
              <Link href={child.route === '/overview' ? '/' : child.route}>{child.name}</Link>
            ) : (
              <span>{child.name}</span>
            );

          return {
            key: childKey,
            label: childLabel,
            icon: iconMap[child.icon] || null
          };
        });
      }

      return menuItem;
    };

    const built = (Array.isArray(data) ? data : []).map(mapItem);
    return { items: built, parentMap: parentMapLocal };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    // if no token, redirect to sign-in
    if (!token) {
      LocalStorage.remove('user');
    }
  }, [router, token]);

  // Function to find the best matching key for the current path
  const findMatchingKey = useCallback(
    (path) => {
      if (!path) return menu || '/overview';

      const pathStr = String(path);

      // kandidat simplified: original, last segment with leading slash, last segment without slash
      const segments = pathStr.split('/').filter(Boolean);
      const lastSeg = segments.length ? segments[segments.length - 1] : '';
      const simplifiedWithSlash = lastSeg ? `/${lastSeg}` : pathStr;
      const simplifiedNoSlash = lastSeg || pathStr;
      const candidates = [pathStr, simplifiedWithSlash, simplifiedNoSlash];

      // 1) exact match on top-level
      if (items.some((it) => candidates.includes(it.key))) {
        const found = items.find((it) => candidates.includes(it.key));
        return found.key;
      }

      // 2) check children exact (also check simplified variants)
      for (const it of items) {
        if (Array.isArray(it.children)) {
          const exactChild = it.children.find((c) => candidates.includes(c.key));
          if (exactChild) return exactChild.key;
        }
      }

      // 3) prefix match: jika child.key adalah prefix dari path (contoh: child.key = '/product' dan path = '/product/category')
      for (const it of items) {
        if (Array.isArray(it.children)) {
          const prefixChild = it.children.find((c) => {
            if (!c.key) return false;
            const key = String(c.key);
            // pastikan kita membandingkan dengan slash-aware check:
            // - jika key dimulai dengan '/', gunakan startsWith langsung
            // - jika key tidak diawali '/', periksa segment match
            if (key.startsWith('/')) {
              return pathStr === key || pathStr.startsWith(key + '/') || pathStr.startsWith(key);
            } else {
              // jika key tanpa slash, cek apakah salah satu segment path sama dengan key
              return segments.includes(key);
            }
          });
          if (prefixChild) return prefixChild.key;
        }
      }

      // 4) suffix match (handle keys like 'category' vs path '/product/category')
      for (const it of items) {
        // check top-level key suffix
        if (it.key && (pathStr === it.key || pathStr.endsWith('/' + it.key) || pathStr.endsWith(it.key))) {
          return it.key;
        }
        if (Array.isArray(it.children)) {
          const suffixChild = it.children.find((c) => {
            if (!c.key) return false;
            const key = c.key;
            return pathStr === key || pathStr.endsWith('/' + key) || pathStr.endsWith(key) || candidates.includes(key);
          });
          if (suffixChild) return suffixChild.key;
        }
      }

      // 5) special-case root mapping: if user at '/', map to configured overview if exists
      if (pathStr === '/' || pathStr === '') {
        const hasOverview = items.some(
          (it) =>
            it.key === '/overview' || (Array.isArray(it.children) && it.children.some((c) => c.key === '/overview'))
        );
        if (hasOverview) return '/overview';
      }

      // fallback: external menu state or the raw path
      return menu || pathStr;
    },
    [items, menu]
  );

  // Determine selectedKey from router pathname or fallback to external menu state
  const selectedKey = useMemo(() => {
    const currentPathRaw = pathname || menu || '';
    return findMatchingKey(currentPathRaw);
  }, [pathname, menu, findMatchingKey]);

  // When selectedKey changes, open its parent group so the view matches screenshot (expanded parent + highlighted child)
  useEffect(() => {
    const parent = parentMap[selectedKey];
    if (parent) {
      setOpenKeys([parent]);
    } else {
      // if selected is a top-level group, open it (if it has children) or close all
      const topMatch = items.find(
        (it) => it.key === selectedKey && Array.isArray(it.children) && it.children.length > 0
      );
      if (topMatch) setOpenKeys([topMatch.key]);
      else setOpenKeys([]);
    }
  }, [selectedKey, parentMap, items]);

  // Logout menu item
  const logoutItem = [
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />
    }
  ];

  // Handler untuk logout
  const handleLogout = () => {
    if (isEditOrAdd) {
      confirm({
        title: 'Unsaved Changes',
        icon: <WarningOutlined />,
        content: `Are you sure you want to cancel ${pathname && pathname.includes('/edit') ? 'editing' : 'adding'} and leave this page?`,
        onSuccess: () => {
          LocalStorage.remove('user');
          router.push('/sign-in');
        }
      });
      return;
    } else {
      LocalStorage.remove('user');
      router.push('/sign-in');
    }
  };

  // Control open keys from Menu (so user can manually open/close groups)
  const onOpenChange = (nextOpenKeys) => {
    setOpenKeys(nextOpenKeys);
  };

  // Handler konfirmasi jika sedang add/edit
  const handleMenuClick = (route) => (e) => {
    if (isEditOrAdd) {
      e.preventDefault();
      confirm({
        title: 'Unsaved Changes',
        icon: <WarningOutlined />,
        content: `Are you sure you want to cancel ${pathname && pathname.includes('/edit') ? 'editing' : 'adding'} and leave this page?`,
        onSuccess: () => {
          router.push(route === '/dashboard' ? '/' : route);
        }
      });
    }
  };

  return (
    <>
      {confirmHolder}
      <Sider theme='light' trigger={null} className={style.sidebar}>
        <div className={style.logo}>
          {isEditOrAdd ? (
            <a onClick={handleMenuClick('/')} className={style.logoLink}>
              <Image className={style.logoImg} src={LogoImage} alt='sfi-logo' width={104} height={64} priority />
            </a>
          ) : (
            <Link href='/' className={style.logoLink}>
              <Image className={style.logoImg} src={LogoImage} alt='sfi-logo' width={104} height={64} priority />
            </Link>
          )}
        </div>
        <Menu
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode='inline'
          items={items}
        />
        <Menu items={logoutItem} onClick={handleLogout} className='ant-menu-logout' />
      </Sider>
    </>
  );
};

export default Sidebar;
