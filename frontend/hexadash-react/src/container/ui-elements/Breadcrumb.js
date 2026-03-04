import React from 'react';
import { Row, Col, Breadcrumb, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { BreadcrumbWrapperStyle } from './ui-elements-styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
// import withRouter from '../../HOC/withRouter';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        General
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Layout
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    </Menu.Item>
  </Menu>
);

function Breadcrumbs() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Avatar',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Breadcrumb" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col md={12} sm={24} xs={24}>
            <Cards title="Basic">
              <BreadcrumbWrapperStyle>
                <Breadcrumb
                  items={[
                    { title: 'Home' },
                    { title: <NavLink to="#">Application Center</NavLink> },
                    { title: <NavLink to="#">Application List</NavLink> },
                    { title: 'An Application' }
                  ]}
                />
              </BreadcrumbWrapperStyle>
            </Cards>
            <Cards title="Bread crumbs with drop down menu">
              <BreadcrumbWrapperStyle>
                <Breadcrumb
                  items={[
                    { title: <NavLink to="#">Design</NavLink> },
                    { title: <NavLink to="#">Component</NavLink> },
                    { 
                      title: <NavLink to="#"><span>General</span></NavLink>,
                      menu: { items: menu.props.children.map((item, index) => ({ key: index, label: item })) }
                    },
                    { title: 'Button' }
                  ]}
                />
              </BreadcrumbWrapperStyle>
            </Cards>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Cards title="With Icon">
              <BreadcrumbWrapperStyle>
                <Breadcrumb
                  items={[
                    { title: <HomeOutlined /> },
                    { title: <NavLink to="#">Application Center</NavLink> },
                    { title: <NavLink to="#"><span>Application List</span></NavLink> },
                    { title: 'An Application' }
                  ]}
                />
              </BreadcrumbWrapperStyle>
            </Cards>

            <Cards title="Configuring the Separator">
              <BreadcrumbWrapperStyle>
                <Breadcrumb 
                  separator=">"
                  items={[
                    { title: 'Home' },
                    { title: <NavLink to="#">Application Center</NavLink> },
                    { title: <NavLink to="#">Application List</NavLink> },
                    { title: 'An Application' }
                  ]}
                />
              </BreadcrumbWrapperStyle>
            </Cards>

            <Cards title="Configuring the Separator">
              <BreadcrumbWrapperStyle>
                <Breadcrumb 
                  separator=""
                  items={[
                    { title: 'Location' },
                    { title: ':' },
                    { title: <NavLink to="#">Application Center</NavLink> },
                    { title: '' },
                    { title: <NavLink to="#">Application List</NavLink> },
                    { title: '' },
                    { title: 'An Application' }
                  ]}
                />
              </BreadcrumbWrapperStyle>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Breadcrumbs;
