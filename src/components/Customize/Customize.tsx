import React, { FC, useEffect, useState } from 'react';
import style from "./Customize.module.css"
import 'react-calendar/dist/Calendar.css';
import "./Customize.module.css"
import "./Customize.css"

import Calendar from 'react-calendar';
import Button from '../Button/Button';
type propsType = {
  max: number
  step: number
  size: number
  clear: () => void
  clearNames: () => void
  print: () => void
  setMax: (max: number) => void
  setStep: (step: number) => void
}
let Customize: FC<propsType> = ({ clear, print, max, size, step, clearNames, setMax, setStep }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  let setStepValue = (step: number) => {
    if (step > 0) setStep(step)
  }
  return (
    <div className={style.block}>
      <h2>Settings</h2>
      {/* <Calendar
        onChange={(time) => onChange(time)}
        selectRange={true}
        defaultValue={[startDate, endDate]}
        locale="en-GB"
        className={style.calendar}
      />
      {startDate.toDateString()}
      {endDate !== null ? endDate.toDateString() : ''}
      <br /> */}
      <Button name='Clear values' onClick={() => clear()} />
      <Button name='Clear labels' onClick={() => clearNames()} />
      <div className={style.settings_block}>
        <b>Max value</b>    <input className={style.input} type="number" value={max} onChange={(e) => { setMax(Number(e.target.value)) }} />
        <b>Step</b>   <input className={style.input} type="number" value={step} onChange={(e) => { setStepValue(Number(e.target.value)) }} />
        {/* <b>Size</b>  <input className={style.input} type="number"  value={size} onChange={(e) => { setSize(Number(e.target.value)) }} /> */}

      </div>
      <Button name='Print' onClick={() => print()} />
    </div>
  )
}
export default Customize