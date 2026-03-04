import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { HeaderWrapper, PageHeaderStyle } from './style';

function PageHeader(props) {
  const { title, subTitle, routes, buttons, ghost, bgColor, className } = props;
  
  const breadcrumb = routes ? (
    <Breadcrumb 
      separator={<span className="ninjadash-seperator" />}
      items={routes.map((route, index) => ({
        key: index,
        title: index + 1 === routes.length ? (
          route.breadcrumbName
        ) : (
          <>
            <ReactSVG src={require(`../../static/img/icon/home.svg`).default} />{' '}
            <Link to={route.path}>{route.breadcrumbName}</Link>
          </>
        )
      }))}
    />
  ) : null;

  return (
    <HeaderWrapper bgColor={bgColor}>
      <PageHeaderStyle className={`ant-page-header ${className || ''} ${breadcrumb ? 'has-breadcrumb' : ''}`}>
        <div className="ant-page-header-heading">
          <div className="ant-page-header-heading-left">
            {title && (
              <div className="ant-page-header-heading-title">
                <h1>{title}</h1>
              </div>
            )}
            {subTitle && (
              <div className="ant-page-header-heading-sub-title">
                {subTitle}
              </div>
            )}
          </div>
          <div className="ant-page-header-heading-extra">
            {breadcrumb && (
              <div className="ant-page-header-breadcrumb">
                {breadcrumb}
              </div>
            )}
            {buttons && (
              <div className="ant-page-header-actions">
                {buttons}
              </div>
            )}
          </div>
        </div>
      </PageHeaderStyle>
    </HeaderWrapper>
  );
}


export { PageHeader };
