import React, { FC, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Title,

} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import style from "./PolarArea.module.css"
import { PolarAreaDataModel } from '../../Model/PolarAreaDataModel';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Title);

type propsType = {
  data: Array<PolarAreaDataModel>
}
let PolarAreaCustom: FC<propsType> = ({ data }) => {
  let [labels, setLabels] = useState<Array<string>>([])
  let [values, setValues] = useState<Array<number>>([])
  let [backgroundColors, setBackgroundColors] = useState<Array<string>>([])

  useEffect((() => {
    let label: Array<string> = []
    let value: Array<number> = []
    let backgroundColor: Array<string> = []
    data.map((el) => {
      label.push(el.label)
      value.push(el.value)
      backgroundColor.push(converHERtoRGBA(el.backgroundColor))
    })
    setLabels(label)
    setValues(value)
    setBackgroundColors(backgroundColor)
  }), [data])
  let converHERtoRGBA = (hex: string) => {
    var c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.85)';
    }
    throw new Error('Bad Hex');
  }
  const dataPolarArea = {
    labels: labels,

    datasets: [
      {
        label: '# of votes',
        // data: [12, 21, 3, 5, 2, 3],
        data: values,
        backgroundColor: backgroundColors,
        //  [
        //   'rgba(255, 99, 132, 0.5)',
        //   'rgba(54, 162, 235, 0.5)',
        //   'rgba(255, 206, 86, 0.5)',
        //   'rgba(75, 192, 192, 0.5)',
        //   'rgba(153, 102, 255, 0.5)',
        //   'rgba(255, 159, 64, 0.5)',
        //   'rgba(255, 15, 64, 0.5)',
        // ],
        borderWidth: 0,

      },
    ],
  };
  const plugins = {
    title: {
      display: true,
      text: 'Chart.js Polar Area Chart With Centered Point Labels',
    },
  }
  const options = {
    plugins: plugins,
    responsive: true,

    scales: {
      r: {
        suggestedMin: 1,
        suggestedMax: 10,

        angleLines: {
          display: true,
          color: "#000"
        },
        ticks: {
          // display: false,
          font: {
            size: 15
          },
          backdropPadding: 0,
          // backdropColor:'red'
        },
        grid: {
          circular: true,
          color: "#000",
          lineWidth: 1,
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18
          },
        },
      },
    },
  }

  return (
    <PolarArea className={style.sheme} data={dataPolarArea} options={options} />
  )
}
export default PolarAreaCustom