// -- libraries
import { useMemo } from 'react';
// --
import LocalStorage from '@utils/localStorage';

const usePermission = (route) => {
  const user = LocalStorage.get('user');

  const permissions = useMemo(() => {
    if (!user || !user.menuItems) {
      return {
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false
      };
    }

    // Cari menu item berdasarkan route dengan iterasi nested structure
    let menuItem = null;

    for (const group of user.menuItems) {
      if (group.menus && Array.isArray(group.menus)) {
        menuItem = group.menus.find((menu) => menu.route === route);
        if (menuItem) break;
      }
    }

    if (!menuItem) {
      return {
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false
      };
    }

    return {
      canView: menuItem.can_view,
      canCreate: menuItem.can_create,
      canEdit: menuItem.can_edit,
      canDelete: menuItem.can_delete
    };
  }, [user, route]);

  return permissions;
};

export default usePermission;
