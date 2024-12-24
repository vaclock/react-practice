import React, { forwardRef, useImperativeHandle, useState } from "react";

function Form(props, ref) {
  const {children = []} = props;
  const [formData, setFormData] = useState({});
  useImperativeHandle(ref, () => ({
    submitForm: (cb) => {
      cb(formData);
    },
    resetForm: () => {
      const newFormData = {...formData}
      Object.keys(formData).forEach(key => {
        newFormData[key] = ''
      })
      setFormData(newFormData)
    }
  }))
  let Children = []
  children?.forEach((child) => {
    if (child.type.displayName === 'FormItem') {
      const {name, children} = child.props
      const element =  React.cloneElement(child, {
        key: name,
        value: formData[name],
        handleChange: (value) => {
          console.log(value, '===')
          setFormData({...formData, [name]: value})
        }
      }, children);
      Children.push(element)
    }
  })
  // console.log(Children, '123', children)
  return (
    <>
    {Children}
    </>
  );
}

export default forwardRef(Form);