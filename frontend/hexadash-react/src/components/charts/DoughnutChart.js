 
 
import React from 'react';
import DashboardChart from './DashboardChart';

function DoughnutChart({ datasets, tooltip, ...props }) {
  return (
    <div className="doughnutchart-inner">
      <div className="doughnutchart-inner-text">
        {datasets[0].centerText === '' ? (
          <span className="doughnutchart-inner-content">
            {Math.round((datasets[0].data[2] / datasets[0].data[1]) * 100)}%
          </span>
        ) : (
          <span className="doughnutchart-inner-content">{datasets[0].centerText}</span>
        )}
        <span className="doughnutchart-inner-label">{datasets[0].centerTextLabel}</span>
      </div>

      <DashboardChart tooltip={tooltip} type="doughnut" datasets={datasets} {...props} />
    </div>
  );
}


export default DoughnutChart;
