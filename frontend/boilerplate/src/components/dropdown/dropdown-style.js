import { Dropdown } from 'antd';
import Styled from 'styled-components';

const Content = Styled.div`
    background: ${({ theme }) => theme[theme.mainContent]['white-background']};
    box-shadow: 0px 0px 2px #888;
    padding: 0 !important;
    margin: 0 !important;
    min-width: auto !important;
    width: 100% !important;
    a i, a svg, a img {
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
    }
    a {
        display: block !important;
        font-size: 14px;
        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        padding: 8px 16px !important;
        margin: 0 !important;
        width: 100% !important;
        span{
            line-height: 1.25;
        }
    }
    a:hover {
        background: ${({ theme }) => theme[theme.mainContent]['primary-transparent']};
        color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
    }
    .dropdown-theme-2{
        a:hover{
            background: ${({ theme }) => theme.pink}10;
            color: ${({ theme }) => theme.pink}
        }
    }
`;

const DropdownStyle = Styled(Dropdown)`
    /* Remove extra padding from Antd v5 dropdown menu items */
    .ant-dropdown-menu .ant-dropdown-menu-item {
        padding: 0 !important;
    }
    
    .ant-dropdown-menu .ant-dropdown-menu-item:hover {
        background-color: transparent !important;
    }
    
    /* Ensure proper styling for nested content */
    .ant-dropdown-menu .ant-dropdown-menu-item .ninjadash-dropdown {
        padding: 0 !important;
        margin: 0 !important;
    }
`;

export { Content, DropdownStyle };
