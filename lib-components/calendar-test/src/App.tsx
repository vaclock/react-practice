import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Calendar, { CalendarRef } from './Calendar.tsx';
function App() {
  const calendarRef = useRef<CalendarRef>(null)
  useEffect(() => {
    // calendarRef.current?.setDate(new Date('2023-1-1'))
    console.log('=')
    const date = calendarRef.current?.getDate()
    console.log(date?.toLocaleDateString(), 'ref')
    setTimeout(() => {
      setDate(new Date('2023-1-1'))
    }, 1000)
  }, [])
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <Calendar ref={calendarRef} value={date} defaultValue={new Date('2024-10-1')} onChange={(date) => {
        console.log(date, 'date')
      }}></Calendar>
      <Calendar defaultValue={new Date()}></Calendar>
    </div>
  );
}

export default App;
