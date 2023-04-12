import React, { FC, ReactElement } from "react";
import { useState, } from "react";
import { PolarAreaDataModel } from "../../Model/PolarAreaDataModel";
import Button from "../Button/Button";


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

    let save = () => {
        let item: PolarAreaDataModel = {
            label: label,
            value: value,
            backgroundColor: backgroundColor,
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
                    <input type="color" value={backgroundColor} onChange={setItemBackgroundColor} /></td>
                <td>
                    <Button name="Save" onClick={save} />
                </td>
                <td >
                    <Button name="Cancel" onClick={canselItem} />
                </td>
            </> : <>
                <td>{item.label}</td>
                <td>{item.value}</td>
                <td style={{ backgroundColor: item.backgroundColor }} />
                <td>
                    <Button name="Edit" onClick={() => setIdEditMode(item.id)} />
                </td>
                <td>
                    <Button name="Delete" onClick={() => deleteItem(item.id)} />
                </td>
            </>}
        </tr >)
}


export default PieChartItem;
