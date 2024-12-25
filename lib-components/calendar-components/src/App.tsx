import React from 'react';
import './App.css';
import Calendar from './Calendar/index.tsx';
import dayjs from 'dayjs';

function App() {
  return (
    <div className="App">
      <Calendar
        locale="en-US"
        value={dayjs('2024-02-28')}
        dateInnerContent={(value) => {
          return (
            <div>
              <p style={{ background: 'yellowgreen', height: '30px' }}>
                {value.format('YYYY/MM/DD')}
              </p>
            </div>
          );
        }}
      ></Calendar>
    </div>
  );
}

export default App;
