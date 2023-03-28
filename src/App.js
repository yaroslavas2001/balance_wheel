import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Title,

} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Title);

export const data = {
  labels: ['work', 'health', 'family', 'Personal growth', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of votes',
      data: [12, 21, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 2,
    },
  ],
};
export const plugins = {
  title: {
    display: true,
    text: 'Chart.js Polar Area Chart With Centered Point Labels',
  },
}
export const options = {
  plugins: plugins,
  responsive: true,
  scales: {
    r: {
      angleLines: {
        display: true,
        color: "#000"
      },

      border: {
        display: true,
        color: "red",
        width: 4,
        z: 2,
        // dash:[3,2,5,6],
      },
      ticks: {
        font: {
          size: 19
        }
        // backdropColor:'red'
      },
      grid: {
        circular: true,
        color: "#000",
        borderColor: 'red',
        borderWidth: 4,
        lineWidth: 1,
      },
      pointLabels: {
        display: true,
        centerPointLabels: true,
        font: {
          size: 18
        }
      },



    },
  },
}

export default function App() {
  return <PolarArea data={data} options={options} />;
}