import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DashboardChart from '../../../../components/charts/DashboardChart';
import { chartLinearGradient, customTooltips } from '../../../../components/utilities/utilities';
import { BorderLessHeading } from '../../../styled';
import { ChartContainer, SalesRevenueWrapper } from '../../Style';

const salesRevenue = {
  today: {
    users: [0, 30, 25, 50, 40, 55, 40, 75, 35, 40, 35, 58],
    labels: ['2(h)', '4(h)', '6(h)', '8(h)', '10(h)', '12(h)', '14(h)', '16(h)', '18(h)', '20(h)', '22(h)', '24(h)'],
  },
  week: {
    users: [25, 30, 35, 20, 25, 40, 35],
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  month: {
    users: [20, 36, 25, 50, 40, 55, 40, 75, 35, 40, 35, 58],
    labels: ['Jan', 'Feb', 'Mar', 'App', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec'],
  },
};

const SaleRevenue = React.memo(({ title = 'Sale Revenue' }) => {
  const [revenue, setRevenue] = useState('today');

  const handleTabActivation = (value) => {
    setRevenue(value);
  };

  const salesRevenueDatasets = [
    {
      data: salesRevenue[revenue].users,
      borderColor: '#8231D3',
      borderWidth: 3,
      fill: true,
      backgroundColor: () =>
        chartLinearGradient(document.getElementById('ninjadash-sales-revenue'), 300, {
          start: '#8231D340',
          end: '#ffffff05',
        }),
      label: 'Current period',
      pointStyle: 'circle',
      pointRadius: '0',
      hoverRadius: '9',
      pointBorderColor: '#fff',
      pointBackgroundColor: '#8231D3',
      hoverBorderWidth: 5,
      amount: '$7,596',
      amountClass: 'current-amount',
      lineTension: 0.5,
    },
  ];

  return (
    <SalesRevenueWrapper>
      {salesRevenue[revenue] && (
        <BorderLessHeading>
          <ChartContainer>
            <Cards
              isbutton={
                <div className="ninjadash-card-nav">
                  <ul>
                    <li className={revenue === 'today' ? 'ninjadash-active' : 'ninjadash-today'}>
                      <Link onClick={() => handleTabActivation('today')} to="#">
                        Today
                      </Link>
                    </li>
                    <li className={revenue === 'week' ? 'ninjadash-active' : 'ninjadash-week'}>
                      <Link onClick={() => handleTabActivation('week')} to="#">
                        Week
                      </Link>
                    </li>
                    <li className={revenue === 'month' ? 'ninjadash-active' : 'ninjadash-month'}>
                      <Link onClick={() => handleTabActivation('month')} to="#">
                        Month
                      </Link>
                    </li>
                  </ul>
                </div>
              }
              title={title}
              size="large"
            >
              <div className="ninjadash-chart-container ninjadash-sales-revenue-lineChart">
                <DashboardChart
                  type="line"
                  id="ninjadash-sales-revenue"
                  labels={salesRevenue[revenue].labels}
                  datasets={salesRevenueDatasets}
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
                        fontFamily: 'Jost',
                        color: '#8A8A8A',
                        suggestedMin: 50,
                        suggestedMax: 80,
                        stepSize: 20,
                        padding: 10,
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
                        fontFamily: 'Jost',
                        color: '#8A8A8A',
                        padding: 10,
                      },
                    },
                  }}
                  tooltip={{
                    custom: customTooltips,
                    callbacks: {
                      title() {
                        return `Total Revenue`;
                      },
                      label(t) {
                        const { formattedValue, dataset } = t;
                        return `${formattedValue}k ${dataset.label}`;
                      },
                    },
                  }}
                  isRatio={true}
                  ratio={2.2}
                  height={325}
                />
              </div>
            </Cards>
          </ChartContainer>
        </BorderLessHeading>
      )}
    </SalesRevenueWrapper>
  );
});


export default SaleRevenue;
