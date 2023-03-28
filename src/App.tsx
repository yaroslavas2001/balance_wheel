import React, { useState } from 'react';

import './App.css';
import PolarAreaCustom from './components/PolarArea/PolarArea';
import PolarAreaTable from './components/PolarAreaTable/PolarAreaTable';
import { PolarAreaDataModel } from './Model/PolarAreaDataModel';

function App() {
  let test: Array<PolarAreaDataModel> = [
    {
      id: 0,
      label: 'work',
      backgroundColor: '#BEA2A2',
      value: 3
    },
    {
      id: 1,
      label: 'hobby',
      backgroundColor: '#525225',
      value: 3
    },
    {
      id: 2,
      label: 'hobby',
      backgroundColor: '#232323',
      value: 4
    }
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
  return (
    <div className="App">
      <PolarAreaCustom data={data} />
      <PolarAreaTable
        data={data} tableName={["Name", "Value", "Color", 'Edit', "Delete"]}
        updateItem={updateItem}
        daleteItem={daleteItem}

      />
    </div>
  );
}

export default App;
