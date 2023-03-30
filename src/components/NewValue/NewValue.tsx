import React, { FC, useEffect, useState } from 'react';
import { Formik } from "formik";
import { Field } from "formik";
import { Form } from "formik";
import style from "./NewValue.module.css"
import { PolarAreaDataModel } from '../../Model/PolarAreaDataModel';

type propsType = {
  data: any
  children: Array<JSX.Element> | JSX.Element
  addItem: (el: any) => void
}
let NewValue: FC<propsType> = ({ data, children, addItem }) => {
  const onSubmit = (values: any, actions: any) => {
    let el: PolarAreaDataModel = {
      label: values.text,
      value: values.number,
      backgroundColor: values.backgroundColor,
      id: Math.random(),
    }
    addItem(el)
    actions.resetForm();
  }
  return (
    <Formik
      initialValues={data}
      onSubmit={onSubmit}
    >
      <Form className={style.block}>
        <Field name="text" type="text" placeholder="Enter text" className={style.input} />
        <Field name="number" type="number" className={style.input} />
        <Field name="backgroundColor" type="color" className={style.input} />
        {children}
        {/* <button type="submit" className={style.btn}>Add</button> */}
      </Form>
    </Formik>
  )
}
export default NewValue