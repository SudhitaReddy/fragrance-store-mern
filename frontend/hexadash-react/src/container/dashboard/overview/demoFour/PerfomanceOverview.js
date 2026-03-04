import React from 'react';
import { Link } from 'react-router-dom';
import UilPrint from '@iconscout/react-unicons/icons/uil-print';
import UilBookOpen from '@iconscout/react-unicons/icons/uil-book-open';
import UilFileAlt from '@iconscout/react-unicons/icons/uil-file-alt';
import UilFile from '@iconscout/react-unicons/icons/uil-file';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DoughnutChart from '../../../../components/charts/DoughnutChart';
import { PerfomanceOverviewStyle } from '../../Style';
import { BorderLessHeading, ChartPointHorizontal } from '../../../styled';

const PerformanceOverview = React.memo(() => {
  const moreContent = (
    <>
      <Link to="#">
        <UilPrint />
        <span>Printer</span>
      </Link>
      <Link to="#">
        <UilBookOpen />
        <span>PDF</span>
      </Link>
      <Link to="#">
        <UilFileAlt />
        <span>Google Sheets</span>
      </Link>
      <Link to="#">
        <UilTimes />
        <span>Excel (XLSX)</span>
      </Link>
      <Link to="#">
        <UilFile />
        <span>CSV</span>
      </Link>
    </>
  );
  const labels = ['Completed', 'Target', 'In Progress'];

  const options = {
    cutout: '80%',
    maintainAspectRatio: false,
    responsive: true,
    borderWidth: 0,
    borderColor: 'transparent',
    plugins: {
      legend: {
        display: false, // no legend
      },
      tooltip: {
        enabled: false, // keep tooltips (or false to disable)
      },
    },
    scales: {
      x: {
        display: false,   // hide x axis completely (line + ticks)
        grid: {
          display: false, // hide grid
        },
        ticks: {
          display: false, // hide numbers
        }
      },
      y: {
        display: false,   // hide y axis completely
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        }
      }
    }
  };
  

  const datasets = [
    {
      data: [50, 30, 20],
      backgroundColor: ['#00E4EC', '#8231D3', '#FA8B0C'],
      centerText: '',
      centerTextLabel: 'Completed',
    },
  ];

  return (
    <BorderLessHeading>
      <Cards more={moreContent} title="Performance Overview" size="large">
        <PerfomanceOverviewStyle>
          <DoughnutChart labels={labels} datasets={datasets} height={160} option={options} id="performance-overview-chart" />
          <ChartPointHorizontal>
            <div className="ninjadash-chartpoint">
              {datasets[0].data.map((value, index) => {
                return (
                  <div className="ninjadash-chartpoint__item" key={index}>
                    <span
                      className="ninjadash-chartpoint__tika"
                      style={{
                        backgroundColor: datasets[0].backgroundColor[index],
                      }}
                    />
                    <span className="ninjadash-chartpoint__label">{labels[index]}</span>
                  </div>
                );
              })}
            </div>
          </ChartPointHorizontal>
        </PerfomanceOverviewStyle>
      </Cards>
    </BorderLessHeading>
  );
});

PerformanceOverview.displayName = 'PerformanceOverview';
export default PerformanceOverview;
