import UilDown from '@iconscout/react-unicons/icons/uil-arrow-down';
import UilUp from '@iconscout/react-unicons/icons/uil-arrow-up';
import { Spin } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DashboardChart from '../../../../components/charts/DashboardChart';
import { BorderLessHeading } from '../../../styled';
import { CardBarChart, ChartContainer } from '../../Style';
// import { useRouteAwareChartHeight } from '../../../../hooks/useRouteAwareChartHeight';

import chartData from '../../../../demoData/dashboardChartContent.json';

const SalesGrowth = React.memo(() => {
  const salesGrowthData = chartData.salesGrowth;
  // Use fixed height for production reliability
  const chartHeight = 300;

  const [state, setState] = useState({
    sellingTab: 'today',
  });

  /* State destructuring */
  const { sellingTab } = state;

  const handleChangePeriod = (value, event) => {
    event.preventDefault();
    setState({
      ...state,
      sellingTab: value,
    });
  };

  const salesGrowthDataset = [
    {
      data: salesGrowthData[sellingTab].orders,
      backgroundColor: '#C097E9',
      hoverBackgroundColor: '#8231D3',
      label: 'Orders',
      average: '50.8',
      maxBarThickness: 10,
      barThickness: 12,
      percent: 49,
    },
    {
      data: salesGrowthData[sellingTab].sales,
      backgroundColor: '#7FD4FF',
      hoverBackgroundColor: '#00AAFF',
      label: 'Sales',
      average: '$28k',
      maxBarThickness: 10,
      barThickness: 12,
      percent: 60,
    },
  ];
  return (
    <BorderLessHeading>
      <Cards
        isbutton={
          <div className="ninjadash-card-nav">
            <ul>
              <li className={sellingTab === 'today' ? 'ninjadash-active' : 'ninjadash-today'}>
                <Link onClick={(e) => handleChangePeriod('today', e)} to="#">
                  Today
                </Link>
              </li>
              <li className={sellingTab === 'week' ? 'ninjadash-active' : 'ninjadash-week'}>
                <Link onClick={(e) => handleChangePeriod('week', e)} to="#">
                  Week
                </Link>
              </li>
              <li className={sellingTab === 'month' ? 'ninjadash-active' : 'ninjadash-month'}>
                <Link onClick={(e) => handleChangePeriod('month', e)} to="#">
                  Month
                </Link>
              </li>
            </ul>
          </div>
        }
        title="Sales Growth"
      >
        {!salesGrowthData[sellingTab] ? (
          <div className="sd-spin">
            <Spin />
          </div>
        ) : (
          <CardBarChart className="ninjadash-profitGroth-barCHar-wrap">
            <div className="ninjadash-chart-top">
              <div className="ninjadash-chart-top__item ninjadash-chart-top__item-order">
                <span className="ninjadash-chart-top__item--amount">$8,550</span>
                <span className="ninjadash-chart-top__item--status status-growth">
                  <UilUp />
                  25%
                </span>
              </div>
              <div className="ninjadash-chart-top__item ninjadash-chart-top__item-sale">
                <span className="ninjadash-chart-top__item--amount">$5,550</span>
                <span className="ninjadash-chart-top__item--status status-down">
                  <UilDown />
                  15%
                </span>
              </div>
            </div>
            <ChartContainer>
              <div className="ninjadash-chart-container">
                <DashboardChart
                  id="ninjadash-sales-growth"
                  labels={salesGrowthData[sellingTab].labels}
                  datasets={salesGrowthDataset}
                  type="bar"
                  layout={{
                    padding: {
                      top: 20,
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
                      title: function (context) {
                        return context[0].label;
                      },
                      label: function (context) {
                        const datasetLabel = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${datasetLabel}: ${value}`;
                      },
                      labelColor: function (context) {
                        return {
                          borderColor: context.dataset.hoverBackgroundColor,
                          backgroundColor: context.dataset.hoverBackgroundColor,
                        };
                      },
                    },
                  }}
                  scales={{
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: true,
                        color: '#eeeeee',
                        drawBorder: false,
                        lineWidth: 0.5,
                        borderDash: [10, 5],
                        borderDashOffset: 4,
                      },
                      border: {
                        display: false,
                      },
                      ticks: {
                        beginAtZero: true,
                        fontSize: 12,
                        fontFamily: 'Jost',
                        color: '#8A8A8A',
                        max: Math.max(...salesGrowthData[sellingTab].orders),
                        stepSize: Math.max(...salesGrowthData[sellingTab].orders) / 5,
                        display: true,
                        min: 0,
                        padding: 10,
                        callback: function (value) {
                          return value + 'k';
                        },
                      },
                    },

                    x: {
                      beginAtZero: true,
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
                        fontFamily: 'Jost',
                        color: '#8A8A8A',
                        min: 0,
                        padding: 10,
                      },
                    },
                  }}
                  plugins={{
                    legend: {
                      display: false,
                    },
                  }}
                  height={chartHeight}
                />
              </div>
            </ChartContainer>
          </CardBarChart>
        )}
      </Cards>
    </BorderLessHeading>
  );
});

export default SalesGrowth;
