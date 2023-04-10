import React, { useState } from 'react';

import './App.css';
import PolarAreaCustom from './components/PolarArea/PolarArea';
import PolarAreaTable from './components/PolarAreaTable/PolarAreaTable';
import { PolarAreaDataModel } from './Model/PolarAreaDataModel';
import Customize from './components/Customize/Customize';
import html2canvas from 'html2canvas';

function App() {
  let test: Array<PolarAreaDataModel> = [
    {
      id: 0,
      label: 'Work',
      backgroundColor: '#448aff',
      value: 1
    },
    {
      id: 1,
      label: 'Hobby',
      backgroundColor: '#1565c0',
      value: 4
    },
    {
      id: 2,
      label: 'Family',
      backgroundColor: '#009688',
      value: 10
    },
    {
      id: 5,
      label: 'Personal growth',
      backgroundColor: '#8bc34a',
      value: 2
    },
    {
      id: 4,
      label: 'Friends',
      backgroundColor: '#ffc107',
      value: 6
    },
    {
      id: 3,
      label: 'Health',
      backgroundColor: '#ff9800',
      value: 8
    },
    {
      id: 6,
      label: 'Relationship',
      backgroundColor: '#f44336',
      value: 7
    },
    {
      id: 7,
      label: 'Finance',
      backgroundColor: '#ad1457',
      value: 3
    },
  ]
  let [max, setMax] = useState<number>(10)
  let [step, setStep] = useState<number>(1)
  let [size, setSize] = useState<number>(800)
  let [data, setData] = useState<Array<PolarAreaDataModel>>(test)

  let addItem = (item: PolarAreaDataModel) => {
    setData(data.concat([item]))
  }
  let updateItem = (item: PolarAreaDataModel) => {
    setData(data.map(el => el.id === item.id ? item : el))
  }
  let daleteItem = (id: number) => {
    setData(data.filter((el) => el.id !== id))
  }
  let clear = () => {
    setData(data.map(item => {
      item.value = 0
      return item
    }))
  }
  let clearNames = () => {
    setData(data.map(item => {
      item.label = ''
      return item
    }))
  }
  let print = () => {
    var container: HTMLElement | null = document.getElementById("htmltoimage"); /* full page */
    if (container)
      html2canvas(container, { allowTaint: true, useCORS: true, logging: true }).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "balance_wheel.jpg";
        link.href = canvas.toDataURL('image/pdf');
        link.target = '_blank';
        link.click();
      });
  }
  return (
    <div className="App">
      <div id='htmltoimage'>
        <PolarAreaCustom setSize={setSize} max={max} size={size}
          step={step} data={data} />
      </div>
      <div className='row'>
        <PolarAreaTable
          data={data}
          tableName={["Name", "Value", "Color", 'Edit', "Delete"]}
          updateItem={updateItem}
          daleteItem={daleteItem}
          addItem={addItem}
        />
        <Customize clearNames={clearNames} setMax={setMax}
          setStep={setStep} clear={clear}
          print={print} max={max} size={size} step={step} />
      </div>
    </div>
  );
}

export default App;
