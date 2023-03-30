import React, { useState } from 'react';

import './App.css';
import PolarAreaCustom from './components/PolarArea/PolarArea';
import PolarAreaTable from './components/PolarAreaTable/PolarAreaTable';
import { PolarAreaDataModel } from './Model/PolarAreaDataModel';

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
      value: 8
    },
    {
      id: 2,
      label: 'Family',
      backgroundColor: '#009688',
      value: 9
    },
    {
      id: 5,
      label: 'Personal growth',
      backgroundColor: '#8bc34a',
      value: 6
    },
    {
      id: 4,
      label: 'Friends',
      backgroundColor: '#ffc107',
      value: 10
    },
    {
      id: 3,
      label: 'Health',
      backgroundColor: '#ff9800',
      value: 6
    },
    {
      id: 6,
      label: 'Relationship',
      backgroundColor: '#f44336',
      value: 10
    },
    {
      id: 7,
      label: 'Finance',
      backgroundColor: '#ad1457',
      value: 4
    },
  ]
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
  return (
    <div className="App">
      <button onClick={() => clear()}>Clear</button>

      <PolarAreaCustom data={data} />
      <PolarAreaTable
        data={data} tableName={["Name", "Value", "Color", 'Edit', "Delete"]}
        updateItem={updateItem}
        daleteItem={daleteItem}
        addItem={addItem}
      />
    </div>
  );
}

export default App;
