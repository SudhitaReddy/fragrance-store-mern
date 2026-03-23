import {
  Uil500px,
  UilAirplay,
  UilArrowUp,
  UilAt,
  UilBagAlt,
  UilBookAlt,
  UilBookOpen,
  UilBookReader,
  UilCalendarAlt,
  UilChartBar,
  UilChat,
  UilCheckSquare,
  UilCircle,
  UilClipboardAlt,
  UilClock,
  UilCompactDisc,
  UilCreateDashboard,
  UilDatabase,
  UilDocumentLayoutLeft,
  UilEdit,
  UilEnvelope,
  UilExchange,
  UilExclamationOctagon,
  // UilExpandArrowsAlt,
  UilFile,
  UilFileShieldAlt,
  UilHeadphones,
  UilIcons,
  UilImages,
  UilLayerGroup,
  UilMap,
  UilPresentation,
  UilQuestionCircle,
  UilSearch,
  UilServer,
  UilSetting,
  UilShoppingCart,
  UilSquareFull,
  UilTable,
  UilUsdCircle,
  UilUsersAlt,
  UilWindowSection,
} from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UilWater } from '@iconscout/react-unicons';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { NavTitle } from './Style';
import versions from '../demoData/changelog.json';
import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';
import { UilFlask, UilListUl } from '@iconscout/react-unicons';

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

  const dispatch = useDispatch();

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

  const changeLayout = (mode) => {
    dispatch(changeLayoutMode(mode));
  };
  const changeNavbar = (topMode) => {
    const html = document.querySelector('html');
    if (topMode) {
      html.classList.add('ninjadash-topmenu');
    } else {
      html.classList.remove('ninjadash-topmenu');
    }
    dispatch(changeMenuMode(topMode));
  };
  const changeLayoutDirection = (rtlMode) => {
    if (rtlMode) {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'rtl');
    } else {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'ltr');
    }
    dispatch(changeDirectionMode(rtlMode));
  };

  const darkmodeActivated = () => {
    document.body.classList.add('dark-mode');
  };

  const darkmodeDiactivated = () => {
    document.body.classList.remove('dark-mode');
  };

   const items = [

  // HOME
  getItem(
    <NavLink onClick={toggleCollapsed} to="/admin">
      Home
    </NavLink>,
    'home',
    !topMenu && <UilCreateDashboard />
  ),

  // INVENTORY
  getItem(
    <NavLink onClick={toggleCollapsed} to="/admin/inventory">
      Inventory
    </NavLink>,
    'inventory',
    !topMenu && <UilDatabase />
  ),

  // 🔥 FORMULA (SUB MENU)
  getItem(
    'Formula',
    'formula',
    !topMenu && <UilBookOpen />,
    [
      getItem(
        <NavLink to="/admin/formula">Create Formula</NavLink>,
        'create-formula'
      ),
      getItem(
        <NavLink to="/admin/formula-list">Saved Formulas</NavLink>,
        'formula-list'
      ),
      getItem(
        <NavLink to="/admin/ai-formula">Generate AI</NavLink>,
        'ai-formula'
      ),
    ]
  ),

  // CATEGORY
  getItem(
    <NavLink onClick={toggleCollapsed} to="/admin/category">
      Category
    </NavLink>,
    'category',
    !topMenu && <UilLayerGroup />
  ),

  // 🔥 DILUTION (SUB MENU)
  getItem(
    'Dilution',
    'dilution',
    !topMenu && <UilWater />,
    [
      getItem(
        <NavLink to="/admin/dilution">Create Dilution</NavLink>,
        'create-dilution'
      ),
      getItem(
        <NavLink to="/admin/dilution/history">Dilution History</NavLink>,
        'dilution-history'
      ),
    ]
  ),

  // 🔥 SETTINGS (SUB MENU)
  getItem(
    'admin settings',
    'settings',
    !topMenu && <UilSetting />,
    [
      getItem(
        <NavLink to="/admin/settings/profile">User Profile</NavLink>,
        'user-profile'
      ),
      getItem(
        <NavLink to="/admin/settings/hardware">Hardware</NavLink>,
        'hardware-inventory'
      ),
      getItem(
        <NavLink to="/admin/settings/recycle">Recycle Bin</NavLink>,
        'recycle'
      ),
    ]
  ),

];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      selectedKeys={selectedKeys}
      defaultOpenKeys={[]}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}


export default MenuItems;
