import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UilDown from '@iconscout/react-unicons/icons/uil-arrow-down';
import UilUp from '@iconscout/react-unicons/icons/uil-arrow-up';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DashboardChart from '../../../../components/charts/DashboardChart';
import { customTooltips } from '../../../../components/utilities/utilities';
import { BorderLessHeading } from '../../../styled';
import { CardBarChart, ChartContainer, UserOverviewStyle } from '../../Style';
// import { useRouteAwareChartHeight } from '../../../../hooks/useRouteAwareChartHeight';

import chartContent from '../../../../demoData/dashboardChartContent.json';

const { userOverviewData } = chartContent;

const UserOverview = React.memo(() => {
  const [overviewTab, setOverviewTab] = useState('today');
  // Use fixed height for production reliability - works in both dev and production
  const chartHeight = 420;

  /* Tab Activation */
  const handleTabActivation = (value) => {
    setOverviewTab(value);
  };

  const userOverviewDataset = [
    {
      data: userOverviewData[overviewTab].target,
      backgroundColor: '#8231D380',
      hoverBackgroundColor: '#8231D3',
      label: 'target',
      maxBarThickness: 10,
      barThickness: 16,
    },
    {
      data: userOverviewData[overviewTab].gained,
      backgroundColor: '#00AAFF80',
      hoverBackgroundColor: '#00AAFF',
      label: 'gained',
      maxBarThickness: 10,
      barThickness: 16,
    },
  ];

  return (
    <>
      {userOverviewData[overviewTab] !== null && (
        <BorderLessHeading>
          <UserOverviewStyle>
            <ChartContainer>
              <Cards
                isbutton={
                  <div className="ninjadash-card-nav">
                    <ul>
                      <li className={overviewTab === 'today' ? 'ninjadash-active' : 'ninjadash-today'}>
                        <Link onClick={(e) => handleTabActivation('today', e)} to="#">
                          Today
                        </Link>
                      </li>
                      <li className={overviewTab === 'week' ? 'ninjadash-active' : 'ninjadash-week'}>
                        <Link onClick={(e) => handleTabActivation('week', e)} to="#">
                          Week
                        </Link>
                      </li>
                      <li className={overviewTab === 'month' ? 'ninjadash-active' : 'ninjadash-month'}>
                        <Link onClick={(e) => handleTabActivation('month', e)} to="#">
                          Month
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
                title="User Overview"
                size="large"
              >
                <CardBarChart className="ninjadash-chart-container ninjadash-chart-container-overview">
                  <div className="ninjadash-chart-top">
                    <div className="ninjadash-chart-top__item ninjadash-chart-top__item-target">
                      <span className="ninjadash-chart-top__item--label">
                        <span
                          className="ninjadash-chart-top__item--tika"
                          style={{
                            backgroundColor: userOverviewDataset[0].hoverBackgroundColor,
                          }}
                        />
                        Target
                      </span>
                      <span className="ninjadash-chart-top__item--amount">$8,550</span>
                      <span className="ninjadash-chart-top__item--status status-growth">
                        <UilUp />
                        25%
                      </span>
                    </div>
                    <div className="ninjadash-chart-top__item ninjadash-chart-top__item-gained">
                      <span className="ninjadash-chart-top__item--label">
                        <span
                          className="ninjadash-chart-top__item--tika"
                          style={{
                            backgroundColor: userOverviewDataset[1].hoverBackgroundColor,
                          }}
                        />
                        Gained
                      </span>
                      <span className="ninjadash-chart-top__item--amount">$5,550</span>
                      <span className="ninjadash-chart-top__item--status status-down">
                        <UilDown />
                        15%
                      </span>
                    </div>
                  </div>
                  <DashboardChart
                    id="ninjadash-user-overview"
                    labels={userOverviewData[overviewTab].labels}
                    datasets={userOverviewDataset}
                    barpercentage="0.5"
                    height={chartHeight}
                    layout={{
                      padding: {
                        top: 20,
                      },
                    }}
                    type="bar"
                    scales={{
                      y: {
                        grid: {
                          display: true,
                          color: '#eeeeee',
                          drawBorder: false,
                          lineWidth: 1,
                        },
                        border: {
                          display: false,
                        },
                        ticks: {
                          beginAtZero: true,
                          fontSize: 12,
                          color: '#8A8A8A',
                          max: Math.max(...userOverviewData[overviewTab].gained),
                          stepSize: Math.floor(Math.max(...userOverviewData[overviewTab].gained) / 5),
                          callback(label) {
                            return `${label}k`;
                          },
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        border: {
                          display: false,
                        },
                        ticks: {
                          beginAtZero: true,
                          fontSize: 12,
                          color: '#8A8A8A',
                        },
                      },
                    }}
                    tooltip={{
                      enabled: true,
                      mode: 'index',
                      intersect: false,
                      backgroundColor: '#ffffff',
                      titleColor: '#182b49',
                      bodyColor: '#182b49',
                      borderColor: '#e8e8e8',
                      borderWidth: 1,
                      displayColors: true,
                      callbacks: {
                        title: function(context) {
                          return context[0].label;
                        },
                        label: function(context) {
                          const datasetLabel = context.dataset.label || '';
                          const value = context.parsed.y;
                          return `${datasetLabel}: ${value}k`;
                        },
                        labelColor: function(context) {
                          return {
                            borderColor: context.dataset.hoverBackgroundColor,
                            backgroundColor: context.dataset.hoverBackgroundColor,
                          };
                        },
                      },
                    }}
                    isRatio={true}
                    ratio={2.4}
                   
                  />
                </CardBarChart>
              </Cards>
            </ChartContainer>
          </UserOverviewStyle>
        </BorderLessHeading>
      )}
    </>
  );
});

UserOverview.displayName = 'UserOverview';
export default UserOverview;
