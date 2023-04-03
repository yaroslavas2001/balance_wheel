import  { FC } from 'react';
import style from "./Button.module.css"
type propsType = {
  onClick: () => void
  name: string
  type?: any
}
let Button: FC<propsType> = ({ onClick, name, type }) => {
  return (<button type={type} className={style.button} onClick={() => onClick()}>{name}</button>)
}
export default Button