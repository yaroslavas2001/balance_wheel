import React, { FC, ReactElement } from "react";
import { useState, } from "react";
import { PolarAreaDataModel } from "../../Model/PolarAreaDataModel";


type propsType = {
    item: PolarAreaDataModel
    editItem: number | null
    deleteItem: (id: number) => void
    updateItem: (item: PolarAreaDataModel) => void
    setIdEditMode: (id: number) => void
    saveItem: (item: PolarAreaDataModel) => void
    canselItem: () => void
}
const PieChartItem: FC<propsType> = ({ editItem, item,
    deleteItem, setIdEditMode, saveItem, canselItem }) => {

    let [label, setLabel] = useState<string>(item.label)
    let [value, setValue] = useState<number>(item.value)
    let [backgroundColor, setBackgroundColor] = useState<string>(item.backgroundColor)
    let backgroundColorInput = backgroundColor.replace(', 0.75)', ')').replace('rgba', 'rgb')
    let save = () => {
        let item: PolarAreaDataModel = {
            label: label,
            value: value,
            backgroundColor: backgroundColor.replace(')', ', 0.75)').replace('rgb', 'rgba'),
            id: editItem ? editItem : 0
        }
        saveItem(item)
    }
    let setItemLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value)
    }
    let setItemValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
    }
    let setItemBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(e.target.value)
    }
    return (
        <tr>
            {editItem === item.id ? <>
                <td><input type="text" value={label} onChange={setItemLabel} /></td>
                <td><input type="number" value={value} onChange={setItemValue} /></td>
               
                <td>
                     {backgroundColorInput}
                    <input type="color" value={backgroundColorInput} onChange={setItemBackgroundColor} /></td>
                <td>
                    <button onClick={save}>
                        Save
                    </button>
                </td>
                <td >
                    <button onClick={canselItem}>
                        Cansel
                    </button>
                </td>
            </> : <>
                <td>{item.label}</td>
                <td>{item.value}</td>
                <td style={{ backgroundColor: item.backgroundColor }} />
                <td>
                    <button onClick={() => setIdEditMode(item.id)}>
                        Edit
                    </button>
                </td>
                <td >
                    <button onClick={() => deleteItem(item.id)}>
                        Delete
                    </button>
                </td>
            </>}
        </tr >)


}


export default PieChartItem;
