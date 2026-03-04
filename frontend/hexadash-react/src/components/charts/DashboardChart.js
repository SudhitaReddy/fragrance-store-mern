import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { customTooltips } from '../utilities/utilities';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

function DashboardChart({
  type = 'line',
  height = 479,
  width = null,
  scales = {
    y: {
      beginAtZero: true,
      grid: {
        color: '#485e9029',
        borderDash: [3, 3],
        zeroLineColor: '#485e9029',
        zeroLineWidth: 1,
      },
      ticks: {
        beginAtZero: true,
        fontSize: 14,
        fontFamily: 'Jost',
        color: '#8C90A4',
        max: 80,
        stepStartValue: 5,
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
        zeroLineWidth: 0,
        color: 'transparent',
        z: 1,
      },
      ticks: {
        beginAtZero: true,
        fontSize: 14,
        fontFamily: 'Jost',
        color: '#8C90A4',
      },
    },
  },
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  id = 'myChart',
  datasets = [
    {
      data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
      borderColor: '#001737',
      borderWidth: 1,
      fill: false,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
    },
    {
      data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
      borderColor: '#1ce1ac',
      borderWidth: 1,
      fill: false,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
    },
  ],
  tooltip = {
    callbacks: {
      label(t) {
        const dstLabel = t.dataset.label;
        const { formattedValue } = t;
        return `  ${formattedValue} ${dstLabel}`;
      },
      labelColor(t) {
        return {
          backgroundColor: t.dataset.backgroundColor,
          borderColor: 'transparent',
        };
      },
    },
  },
  layout = {},
  legend = {
    display: false,
    labels: {
      display: false,
      position: 'center',
    },
  },
  elements = {
    line: {
      tension: 0.6,
      borderCapStyle: 'round',
      borderJoinStyle: 'round',
      capBezierPoints: true,
    },
    point: {
      radius: 0,
      z: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
    },
    bar: {
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
    },
  },
  option = {},
  ratio = 2,
  isRatio = false,
  ...props
}) {
  useEffect(() => {
    let chart = null;
    let unmounted = false;
    let handleResize = null;
    
    if (!unmounted) {
      const canvas = document.getElementById(id);
      if (canvas) {
        // Set explicit dimensions to prevent resizing on route navigation
        canvas.style.width = '100%';
        canvas.style.height = `${height}px`;
        canvas.style.maxHeight = `${height}px`;
        canvas.style.minHeight = `${height}px`;
      }
      chart = new Chart(canvas.getContext('2d'), {
        type,
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: isRatio,
          aspectRatio: ratio,
          layout,
          hover: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend,
            tooltip: {
              yAlign: 'bottom',
              xAlign: 'right',
              mode: 'index',
              intersect: false,
              backgroundColor: '#ffffff',
              boxShadow: '0 8px 5px #ADB5D915',
              position: 'nearest',
              titleColor: '#ADB5D9',
              color: '#ADB5D9',
              titleFontSize: 12,
              titleSpacing: 10,
              bodyColor: '#525768',
              bodyFontSize: 11,
              bodyFontStyle: 'normal',
              bodyFontFamily: "'Jost', sans-serif",
              borderColor: '#F1F2F6',
              usePointStyle: true,
              borderWidth: 1,
              bodySpacing: 10,
              padding: {
                x: 10,
                y: 8,
              },
              z: 999999,
              enabled: true,
              ...tooltip,
            },
          },
          elements: {
            ...elements,
            // Ensure shadow removal for all chart elements
            point: {
              ...elements.point,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              shadowColor: 'transparent',
            },
            bar: {
              ...elements.bar,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              shadowColor: 'transparent',
            },
            line: {
              ...elements.line,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              shadowColor: 'transparent',
            },
          },
          scales: scales,
          ...option,
        },
      });

      // Add resize handler to maintain dimensions on route changes
      handleResize = () => {
        if (chart && !unmounted) {
          const canvas = document.getElementById(id);
          if (canvas) {
            canvas.style.height = `${height}px`;
            canvas.style.maxHeight = `${height}px`;
            canvas.style.minHeight = `${height}px`;
            chart.resize();
          }
        }
      };

      // Listen for route changes and window resize
      window.addEventListener('resize', handleResize);
      
      // Trigger resize after delays to handle route navigation
      setTimeout(handleResize, 100);
      setTimeout(handleResize, 500);
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      unmounted = true;
    };
  }, [type, datasets, labels, id, layout, legend, elements, scales, tooltip, option, height]);

  return <canvas width={width} height={height} id={id} {...props} />;
}

export default DashboardChart;
