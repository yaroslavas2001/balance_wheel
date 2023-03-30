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
import html2canvas from 'html2canvas';
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
  let print = () => {
    // var container = document.getElementById("image-wrap");
    /*specific element on page*/
    var container: HTMLElement | null = document.getElementById("htmltoimage"); /* full page */
    if (container)
      html2canvas(container, { allowTaint: true, useCORS: true, logging: true }).then(function (canvas) {
        //  useCORS: true, logging:true
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "balance_wheel.jpg";
        link.href = canvas.toDataURL('image/pdf');
        link.target = '_blank';
        link.click();
      });
  }

  const dataPolarArea = {
    labels: labels,
    datasets: [
      {
        label: '# of votes',
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 0,

      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: false,
        // text: 'Chart.js Polar Area Chart With Centered Point Labels',
        font: {
          size: 15
        },
      },
    },
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
            size: 20
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
            size: 20
          },
          padding: 0,
        },
      },
    },
  }

  return (
    <div>
      <button onClick={() => print()}>Print</button>
      <div id='htmltoimage'>
        <PolarArea className={style.sheme} data={dataPolarArea} options={options} />
      </div>
    </div>
  )
}
export default PolarAreaCustom