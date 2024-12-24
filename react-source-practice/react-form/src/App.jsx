import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Form'
import FormItem from './FormItem'
import Input from './Input'

function App() {
  const form = useRef(null)

  return (
    <>
    <Form ref={form}
    >
      <FormItem name="name1" label="nam1">
        <Input></Input>
      </FormItem>
      <FormItem name="name2" label="nam2">
        <Input></Input>
      </FormItem>
      <FormItem name="name3" label="nam3">
        <Input></Input>
      </FormItem>
    </Form>
    <button onClick={() => {
      form.current.submitForm((value) => {
        console.log(value, 'submit')
      })
    }}>提交</button>
    <button onClick={() => {
      form.current.resetForm()
    }}>重置</button>
    </>
  )
}

export default App
