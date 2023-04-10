import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import style from "./PolarArea.module.css"
import { PolarAreaDataModel } from '../../Model/PolarAreaDataModel';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Title);

type propsType = {
  data: Array<PolarAreaDataModel>
  max: number
  step: number
  size: number
  setSize: (nume: number) => void
}
let PolarAreaCustom: FC<propsType> = ({ data, max, step, size, setSize }) => {
  let [labels, setLabels] = useState<Array<string>>([])
  let [values, setValues] = useState<Array<number>>([])

  let [backgroundColors, setBackgroundColors] = useState<Array<string>>([])
  let ref: any = useRef()
  let check = () => {
    if (ref !== undefined) {
      if (ref.current !== undefined) {
        setSizeValue(ref.current.width, ref.current.height)
      }
    }
  }
  let resize = (e: any) => {
    setSizeValue(e.target.innerWidth, e.target.innerHeight)
  }
  let setSizeValue = (width: number, height: number) => {
    let size = (width <= height) ? width : height
    setSize(size)
  }
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
    window.addEventListener('resize', (e: any) => { resize(e) });
    check()
    return () => {
      window.removeEventListener('resize', (e: any) => { resize(e) });
    }
  }), [data])

  let converHERtoRGBA = (hex: string) => {
    var c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.80)';
    }
    throw new Error('Bad Hex');
  }


  const dataPolarArea = {
    labels: labels,
    datasets: [
      {
        label: '#',
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 0,

      },
    ],
  };
  const options = {
    // responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: max,
        angleLines: {
          display: true,
          color: "#000"
        },
        ticks: {
          // display: false,
          stepSize: step,
          font: {
            // size: 20
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
            // size: 20
          },
          padding: 0,
        },
      },
    },
  }
  let styleSize = {
    weight: size + 'px',
    height: size + 'px'
  }
  return (
    <div style={styleSize} >
      <PolarArea ref={ref} className={style.sheme} data={dataPolarArea} options={options} />
    </div>
  )
}
export default PolarAreaCustom