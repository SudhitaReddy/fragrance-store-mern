import { UilCircle } from '@iconscout/react-unicons';

import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const topMenu = useSelector((state) => state.ChangeLayoutMode.topMenu);

  const path = '/admin';
  const pathName = window.location.pathname;
  
  // Memoize path parsing to prevent infinite loops
  const mainPathSplit = React.useMemo(() => {
    const pathArray = pathName && pathName !== '/' ? pathName.split(path) : [];
    const mainPath = pathArray.length > 1 ? pathArray[1] : '';
    return mainPath.split('/').filter(Boolean); // Remove empty strings
  }, [pathName]);

  // Map URL paths to menu keys for proper active state
  const getSelectedKeyFromPath = React.useMemo(() => {
    if (mainPathSplit.length === 0) return 'home';
    if (mainPathSplit.length === 1) return mainPathSplit[0];
    
    // Handle special cases for nested routes
    const [first, second] = mainPathSplit;
    
    // Map Firestore routes to their menu keys
    if (first === 'firebase') {
      if (second === 'fbView') return 'firestore-view';
      if (second === 'fbAdd') return 'firestore-add';
      if (second === 'edit') return 'firestore-edit';
    }
    
    // Map Axios routes to their menu keys
    if (first === 'axios') {
      if (second === 'crud') {
        if (mainPathSplit[2] === 'axios-view') return 'axios-view';
        if (mainPathSplit[2] === 'add') return 'axios-add';
      }
      // Handle direct axios routes
      if (second === 'axios-view') return 'axios-view';
      if (second === 'add') return 'axios-add';
    }
    
    // Default to second level for other nested routes
    return second || first;
  }, [mainPathSplit]);

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 1 ? mainPathSplit[0] : 'dashboard'}`] : [],
  );

  const [selectedKeys, setSelectedKeys] = React.useState(
    !topMenu ? [getSelectedKeyFromPath] : []
  );

  // Update selected keys when pathname changes
  React.useEffect(() => {
    if (!topMenu) {
      const newSelectedKey = getSelectedKeyFromPath;
      setSelectedKeys([newSelectedKey]);
      
      // Update open keys for submenu
      const newOpenKey = `${mainPathSplit.length > 1 ? mainPathSplit[0] : 'dashboard'}`;
      setOpenKeys([newOpenKey]);
    }
  }, [pathName, topMenu, mainPathSplit, getSelectedKeyFromPath]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    // Update selected keys when clicking on a menu item
    if (item.key) {
      setSelectedKeys([item.key]);
    }
    
    // Close open keys if clicking on a top-level item
    if (item.keyPath.length === 1) {
      setOpenKeys([]);
    }
  };

  const items = [
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/starter`}>
        {t('blank')} {t('page')}
      </NavLink>,
      'starter',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/pages/starter`}>
          <UilCircle />
        </NavLink>
      ),
    ),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      selectedKeys={selectedKeys}
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 1 ? mainPathSplit[0] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}


export default MenuItems;
