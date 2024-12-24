import React, {useImperativeHandle} from 'react';
import {useControllableValue} from 'ahooks'
import './Calendar.css';

const datesInMonth = (year: number, month: number) => {
  // 当月最后一天 也就是下个月前一天 如果date是0 则是上个月最后一天
  return new Date(year, month + 1, 0).getDate()
}
const firstDayOfMonth = (year: number, month: number) => {
  // 第一天
  return new Date(year, month, 1).getDay()
}

interface IProps {
  value?: Date;
  defaultValue: Date;
  onChange?: (arg: Date) => void
}

export interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void,
}

function Calendar(props: IProps, ref: React.Ref<CalendarRef> | undefined) {
  // const {defaultValue = new Date(), onChange} = props
  // const [date, setDate] = useState(defaultValue)
  // useControllableValue 同时支持受控非受控
  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date()
  });
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  useImperativeHandle(ref, () => {
    return {
      getDate: () => {
        return date
      },
      setDate: (date) => {
        setDate(date)
      }
    }
  })

  const renderDates = (): JSX.Element[] => {
    const days: JSX.Element[] = []
    const firstDate = firstDayOfMonth(date.getFullYear(), date.getMonth())
    const dayCounts = datesInMonth(date.getFullYear(), date.getMonth())
    const curDate = date.getDate();

    const lastMonth = date.getMonth() - 1
    const lastMonthDates = datesInMonth(date.getFullYear(), lastMonth)

    const nextMonth = date.getMonth() + 1

    const clickHandler = (dayCount: number, month?: number) => {
      const curDate = new Date(date.getFullYear(), month || date.getMonth(), dayCount)
      setDate(curDate)
    }

    console.log(lastMonthDates-firstDate, lastMonthDates, '=')
    for (let i = lastMonthDates - firstDate; i < lastMonthDates; i++) {
      // days.push(<div key={`empty${i}`} className="empty"></div>)
      days.push(<div key={`prev${i}`} className="day prev" onClick={() => {clickHandler(i, lastMonth)}}>{i}</div>)
    }
    for (let i = 1; i <= dayCounts; i++) {
      if (curDate === i) {
        days.push(<div key={`day${i}`} className="day selected" onClick={() => {clickHandler(i)}}>{i}</div>)
      } else {
        days.push(<div key={`day${i}`} className="day" onClick={() => {clickHandler(i)}}>{i}</div>)
      }
    }
    const totalDates = dayCounts + firstDate
    if (totalDates > 35) {
      // 证明当前月 + 起始时间超过5个星期，需要6行展示
      // 1 2 3 4
      for (let i = totalDates + 1; i <= 42; i++) {
        days.push(<div key={`prev${i}`} className="day prev" onClick={() => {clickHandler(i, nextMonth)}}>{i - totalDates}</div>)
      }
    } else {
      for (let i = totalDates + 1; i <= 35; i++) {
        days.push(<div key={`prev${i}`} className="day next" onClick={() => {clickHandler(i, nextMonth)}}>{i - totalDates}</div>)
      }
    }
    return days
  }
  const monthsName = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ]
  const dates = renderDates()
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{`${date.getFullYear()}年${monthsName[date.getMonth()]}`}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {/* {
          dates
        } */}
        {
          renderDates()
        }
        {/* <div className="empty"></div>
        <div className="empty"></div>
        <div className="day">1</div>
        <div className="day">2</div>
        <div className="day">3</div>
        <div className="day">4</div>
        <div className="day">5</div>
        <div className="day">6</div>
        <div className="day">7</div>
        <div className="day">8</div>
        <div className="day">9</div>
        <div className="day">10</div>
        <div className="day">11</div>
        <div className="day">12</div>
        <div className="day">13</div>
        <div className="day">14</div>
        <div className="day">15</div>
        <div className="day">16</div>
        <div className="day">17</div>
        <div className="day">18</div>
        <div className="day">19</div>
        <div className="day">20</div>
        <div className="day">21</div>
        <div className="day">22</div>
        <div className="day">23</div>
        <div className="day">24</div>
        <div className="day">25</div>
        <div className="day">26</div>
        <div className="day">27</div>
        <div className="day">28</div>
        <div className="day">29</div>
        <div className="day">30</div>
        <div className="day">31</div> */}
      </div>
    </div>
  );
}

export default React.forwardRef(Calendar);
