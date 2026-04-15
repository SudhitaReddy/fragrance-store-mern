import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { Button, Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import { Component } from 'react';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import MenueItems from './MenueItems';
import { FooterStyle, LayoutContainer, TopMenuSearch } from './Style';
import TopMenu from './TopMenu';
import Search from '../components/utilities/auth-info/Search';

const { theme } = require('../config/theme/themeVariables');
const { Header, Sider, Content } = Layout;

const ThemeLayout = (WrappedComponent) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        collapsed: false,
        hide: true,
      };

      this.mountedRef = { current: false };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      this.mountedRef.current = true;

      window.addEventListener('resize', this.updateDimensions);

      this.setState({
        collapsed: window.innerWidth <= 1200,
      });
    }

    componentWillUnmount() {
      this.mountedRef.current = false;
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      if (this.mountedRef.current) {
        this.setState({
          collapsed: window.innerWidth <= 1200,
        });
      }
    }

    render() {
      const { collapsed } = this.state;
      const { layoutMode, rtl, topMenu } = this.props;

      const left = !rtl ? 'left' : 'right';

      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const SideBarStyle = {
        margin: '0 0 0 0',
        padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        
        [left]: 0,
        zIndex: 988,
      };

      return (
  <LayoutContainer>
    <Layout className="layout">

      {/* HEADER */}
      <TopMenu />

      <Layout>

        {/* SIDEBAR */}
        {!topMenu || window.innerWidth <= 991 ? (
          <ThemeProvider theme={theme}>
            <Sider
              width={280}
              style={SideBarStyle}
              collapsed={collapsed}
              theme={layoutMode === 'lightMode' ? 'light' : 'dark'}
            >
              <Scrollbars autoHide>

                <MenueItems
                  topMenu={topMenu}
                  toggleCollapsed={toggleCollapsedMobile}
                />

              </Scrollbars>
            </Sider>
          </ThemeProvider>
        ) : null}

        {/* MAIN */}
        <Layout className="atbd-main-layout">

          <Content>

            <WrappedComponent {...this.props} />

            {/* <FooterStyle className="admin-footer">

              <Row>

                <Col md={12} xs={24}>
                  © 2023 <Link to="#">SovWare</Link>
                </Col>

                <Col md={12} xs={24}>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">Team</NavLink>
                  <NavLink to="#">Contact</NavLink>
                </Col>

              </Row>

            </FooterStyle> */}

          </Content>

        </Layout>

      </Layout>

    </Layout>
  </LayoutContainer>
);
    }
  }

  const mapStateToProps = (state) => ({
    layoutMode: state.ChangeLayoutMode.mode,
    rtl: state.ChangeLayoutMode.rtlData,
    topMenu: state.ChangeLayoutMode.topMenu,
  });

  LayoutComponent.propTypes = {
    layoutMode: propTypes.string,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
  };

  return connect(mapStateToProps)(LayoutComponent);
};

export default ThemeLayout;