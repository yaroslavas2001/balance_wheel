import React, { FC, useEffect, useState } from 'react';
import style from "./Customize.module.css"
import 'react-calendar/dist/Calendar.css';
import "./Customize.module.css"
import "./Customize.css"

import Calendar from 'react-calendar';
type propsType = {
  max: number
  step: number
  size: number
  clear: () => void
  clearNames: () => void
  print: () => void
  setMax: (max: number) => void
  setStep: (step: number) => void
  setSize: (size: number) => void
}
let Customize: FC<propsType> = ({ clear, print, max, size, step, clearNames, setMax, setStep, setSize }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className={style.block}>
      <Calendar
        onChange={(time) => onChange(time)}
        selectRange={true}
        defaultValue={[startDate, endDate]}
        locale="en-GB"
        className={style.calendar}
      />
      {startDate.toDateString()}
      {endDate !== null ? endDate.toDateString() : ''}
      <br />


      <button onClick={() => clear()}>Clear values</button>
      <button onClick={() => clearNames()}>Clear labels</button>
      max <input type="number" value={max} onChange={(e) => { setMax(Number(e.target.value)) }} />
      step<input type="number" value={step} onChange={(e) => { setStep(Number(e.target.value)) }} />
      size<input type="number" min={500} value={size} onChange={(e) => { setSize(Number(e.target.value)) }} />
      <button onClick={() => print()}>Print</button>
    </div>
  )
}
export default Customize