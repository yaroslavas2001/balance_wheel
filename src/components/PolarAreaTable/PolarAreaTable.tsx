import React, { FC, ReactElement } from "react";
import { useState, } from "react";
import { PolarAreaDataModel } from "../../Model/PolarAreaDataModel";
import PolarAreaTableItem from "./PolarAreaTableItem";


type propsType = {
  tableName: Array<string>
  data: Array<PolarAreaDataModel>
  daleteItem: (id: number) => void
  updateItem: (item: PolarAreaDataModel) => void
}
let PolarAreaTable: FC<propsType> = ({ data, tableName, daleteItem, updateItem }) => {
  let th = tableName.map((el, index) => <th key={index}>{el}</th>)

  let [editItem, setEditItem] = useState<number | null>(null)

  let deleteItem = (id: number) => {
    daleteItem(id)
  }
  let setIdEditMode = (id: number) => {
    setEditItem(id)
  }
  let saveItem = (item: PolarAreaDataModel) => {
    updateItem(item)
    setEditItem(null)
  }
  let canselItem = () => {
    setEditItem(null)
  }
  let itemList = data.map((item: PolarAreaDataModel) =>
    <PolarAreaTableItem
      key={item.id}
      item={item}
      editItem={editItem}
      deleteItem={deleteItem}
      updateItem={updateItem}
      setIdEditMode={setIdEditMode}
      saveItem={saveItem}
      canselItem={canselItem}
    />
  )

  return (<table>
    <thead>
      <tr>
        {th}
      </tr>
    </thead>
    <tbody>
      {itemList}
    </tbody>
  </table>)
}


export default PolarAreaTable;
