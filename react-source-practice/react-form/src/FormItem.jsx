import React from "react"

export default function FormItem(props) {
  const {label, name, children, value, handleChange} = props
  const onChange = (value) => {
    handleChange(value)
  }
  return <div>
    <span>{label}</span>
    {React.isValidElement(children) && children.type.displayName === 'input' ? React.cloneElement(children, {onChange, value}) : null}
  </div>
}

FormItem.displayName = 'FormItem'