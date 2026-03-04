import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
function Menus() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Menu',
    },
  ];
  const [state, setState] = useState({
    current: 'mail',
  });

  const handleClick = (e) => {
    setState({
      current: e.key,
    });
  };

  const onVerticleHandleClick = () => {
    // console.log('click ', e);
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Menu" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col md={24} sm={24} xs={24}>
            <Cards title="Top Navigation">
              <Menu 
                onClick={handleClick} 
                selectedKeys={[state.current]} 
                mode="horizontal"
                items={[
                  {
                    key: 'mail',
                    icon: <MailOutlined />,
                    label: 'Navigation One',
                  },
                  {
                    key: 'app',
                    icon: <AppstoreOutlined />,
                    label: 'Navigation Two',
                    disabled: true,
                  },
                  {
                    key: 'submenu',
                    icon: <SettingOutlined />,
                    label: 'Navigation Three - Submenu',
                    children: [
                      {
                        key: 'group1',
                        label: 'Item 1',
                        type: 'group',
                        children: [
                          {
                            key: 'setting:1',
                            label: 'Option 1',
                          },
                          {
                            key: 'setting:2',
                            label: 'Option 2',
                          },
                        ],
                      },
                      {
                        key: 'group2',
                        label: 'Item 2',
                        type: 'group',
                        children: [
                          {
                            key: 'setting:3',
                            label: 'Option 3',
                          },
                          {
                            key: 'setting:4',
                            label: 'Option 4',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key: 'alipay',
                    label: (
                      <Link to="#" target="_blank" rel="noopener noreferrer">
                        Navigation Four - Link
                      </Link>
                    ),
                  },
                ]}
              />
            </Cards>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Cards title="Vertical Menu">
              <Menu 
                onClick={onVerticleHandleClick} 
                style={{ width: 256 }} 
                mode="vertical"
                items={[
                  {
                    key: 'sub1',
                    icon: <MailOutlined />,
                    label: 'Navigation One',
                    children: [
                      {
                        key: 'group1',
                        label: 'Item 1',
                        type: 'group',
                        children: [
                          {
                            key: '1',
                            label: 'Option 1',
                          },
                          {
                            key: '2',
                            label: 'Option 2',
                          },
                        ],
                      },
                      {
                        key: 'group2',
                        label: 'Item 2',
                        type: 'group',
                        children: [
                          {
                            key: '4',
                            label: 'Option 3',
                          },
                          {
                            key: '15',
                            label: 'Option 4',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key: 'sub2',
                    icon: <AppstoreOutlined />,
                    label: 'Navigation Two',
                    children: [
                      {
                        key: '16',
                        label: 'Option 5',
                      },
                      {
                        key: '17',
                        label: 'Option 6',
                      },
                      {
                        key: 'sub3',
                        label: 'Submenu',
                        children: [
                          {
                            key: '18',
                            label: 'Option 7',
                          },
                          {
                            key: '19',
                            label: 'Option 8',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key: 'sub4',
                    icon: <SettingOutlined />,
                    label: 'Navigation Three',
                    children: [
                      {
                        key: '9',
                        label: 'Option 9',
                      },
                      {
                        key: '10',
                        label: 'Option 10',
                      },
                      {
                        key: '11',
                        label: 'Option 11',
                      },
                      {
                        key: '12',
                        label: 'Option 12',
                      },
                    ],
                  },
                ]}
              />
            </Cards>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Cards title="Current Sub Menu">
              <Menu
                onClick={onVerticleHandleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={[
                  {
                    key: 'sub1',
                    icon: <MailOutlined />,
                    label: 'Navigation One',
                    children: [
                      {
                        key: 'g1',
                        label: 'Item 1',
                        type: 'group',
                        children: [
                          {
                            key: '1',
                            label: 'Option 1',
                          },
                          {
                            key: '2',
                            label: 'Option 2',
                          },
                        ],
                      },
                      {
                        key: 'g2',
                        label: 'Item 2',
                        type: 'group',
                        children: [
                          {
                            key: '3',
                            label: 'Option 3',
                          },
                          {
                            key: '4',
                            label: 'Option 4',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key: 'sub2',
                    icon: <AppstoreOutlined />,
                    label: 'Navigation Two',
                    children: [
                      {
                        key: '20',
                        label: 'Option 5',
                      },
                      {
                        key: '21',
                        label: 'Option 6',
                      },
                      {
                        key: 'sub3',
                        label: 'Submenu',
                        children: [
                          {
                            key: '22',
                            label: 'Option 7',
                          },
                          {
                            key: '23',
                            label: 'Option 8',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key: 'sub4',
                    icon: <SettingOutlined />,
                    label: 'Navigation Three',
                    children: [
                      {
                        key: '9',
                        label: 'Option 9',
                      },
                      {
                        key: '10',
                        label: 'Option 10',
                      },
                      {
                        key: '11',
                        label: 'Option 11',
                      },
                      {
                        key: '12',
                        label: 'Option 12',
                      },
                    ],
                  },
                ]}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Menus;
