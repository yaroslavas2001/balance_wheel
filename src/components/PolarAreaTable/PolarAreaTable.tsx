import React, { FC, ReactElement } from "react";
import { useState, } from "react";
import { PolarAreaDataModel } from "../../Model/PolarAreaDataModel";
import PolarAreaTableItem from "./PolarAreaTableItem";
import style from "./PolarAreaTable.module.css"
import NewValue from "./../NewValue/NewValue"
type propsType = {
  tableName: Array<string>
  data: Array<PolarAreaDataModel>
  daleteItem: (id: number) => void
  updateItem: (item: PolarAreaDataModel) => void
  addItem: (item: PolarAreaDataModel) => void
}
let PolarAreaTable: FC<propsType> = ({ data, tableName, daleteItem, updateItem, addItem }) => {
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

  return (
    <div>
      <div>
        <NewValue addItem={addItem} data={{ text: '', number: 0, backgroundColor: "#000000" }}>
          <button type="submit" className={style.btn}>Add</button>
        </NewValue>
      </div>
      <table>
        <thead>
          <tr>
            {th}
          </tr>
        </thead>
        <tbody>
          {itemList}
        </tbody>
      </table>
    </div>

  )
}


export default PolarAreaTable;
