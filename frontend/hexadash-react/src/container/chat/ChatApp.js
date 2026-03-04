import React, { useState, lazy, Suspense } from 'react';
import { Row, Col, Badge, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import PrivetChat from './overview/PrivetChat';
import GroupChat from './overview/GroupChat';
import AllContacts from './overview/AllContacts';
import { UL, Content, ChatSidebar } from './style';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';

const SingleChat = lazy(() => import('./overview/singleChat'));
const SingleGroup = lazy(() => import('./overview/SingleGroupChat'));

function ChatApp() {
  const navigate = useNavigate();
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Chat',
    },
  ];
  const rtl = useSelector((state) => state.ChangeLayoutMode.rtlData);
  const searchData = useSelector((state) => state.headerSearchData);
  const [state, setState] = useState({
    search: searchData,
    me: 'woadud@gmail.com',
  });

  const { notData } = state;

  const handleNavigation = (path) => {
    navigate(`/admin/main/chat/${path}`, { replace: true });
  };

  const patternSearch = (searchText) => {
    const data = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      search: data,
    });
  };

  const renderView = ({ style }) => {
    const customStyle = {
      marginRight: 'auto',
      [rtl ? 'left' : 'right']: '2px',
      [rtl ? 'marginLeft' : 'marginRight']: '-19px',
    };
    return <div style={{ ...style, ...customStyle }} />;
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Dashboard" routes={PageRoutes} />

      <Main>
        <Row gutter={30}>
          <Col xxl={7} lg={10} xs={24}>
            <ChatSidebar>
              <Cards headless>
                <div className="chatbox-search">
                  <AutoComplete onSearch={patternSearch} dataSource={notData} width="100%" patterns />
                </div>
                <nav>
                <UL>
                    <li>
                      <NavLink activeclassname="active" to="/admin/main/chat/private/rofiq@gmail.com">
                        Private Chat
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeclassname="active" to="/admin/main/chat/group/1">
                        Group Chat
                        <Badge className="badge-error" count={3} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeclassname="active" to="/admin/main/chat/all/rofiq@gmail.com">
                        All Contacts
                      </NavLink>
                    </li>
                  </UL>
                </nav>
                <Content>
                  <Scrollbars
                    className="custom-scrollbar"
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                    renderView={renderView}
                    renderTrackVertical={(props) => <div {...props} className="ninjadash-track-vertical" />}
                  >
                    <Suspense
                      fallback={
                        <Cards headless>
                          <Skeleton avatar paragraph={{ rows: 10 }} active />
                        </Cards>
                      }
                    >
                      <Routes>
                        <Route index element={<PrivetChat />} />
                        <Route path="private/*" element={<PrivetChat />} />
                        <Route path="group/*" element={<GroupChat />} />
                        <Route path="all/*" element={<AllContacts />} />
                      </Routes>
                    </Suspense>
                  </Scrollbars>
                </Content>
              </Cards>
            </ChatSidebar>
          </Col>
          <Col xxl={17} lg={14} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar paragraph={{ rows: 10 }} active />
                </Cards>
              }
            >
              <Routes>
                <Route path="private/:id" element={<SingleChat />} />
                <Route path="all/:id" element={<SingleChat />} />
                <Route path="group/:id" element={<SingleGroup />} />
              </Routes>
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default ChatApp;
