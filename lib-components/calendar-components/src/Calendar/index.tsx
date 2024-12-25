import React, { CSSProperties, ReactNode, useState } from 'react';
import './index.css';
import MonthCalendar from './MonthCalendar.tsx';
import dayjs, { Dayjs } from 'dayjs';
import Header from './Header.tsx';
import classNames from 'classnames';
import LocaleContext from './LocaleContext.tsx';
import { useControllableValue } from 'ahooks';

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}
function Calendar(props: CalendarProps) {
  const { value, style, className } = props;
  const cs = classNames(className, 'calendar');
  // const [curDate, setCurDate] = useState<Dayjs>(value);
  const [curDate, setCurDate] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs(),
  });

  const selectedHandler = (date: Dayjs) => {
    setCurDate(date);
    props.onChange?.(date);
  };
  const prevMonthHandler = () => {
    setCurDate(curDate.subtract(1, 'month'));
  };
  const nextMonthHandler = () => {
    setCurDate(curDate.add(1, 'month'));
  };
  const BackToTodayHandler = () => {
    const date = dayjs(Date.now());
    setCurDate(date);
    props.onChange?.(date);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale: props.locale || navigator.language || 'zh-CN',
      }}
    >
      <div className={cs} style={style}>
        <Header
          value={curDate}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          BackToTodayHandler={BackToTodayHandler}
        ></Header>
        <MonthCalendar
          {...props}
          value={curDate}
          selectedHandler={selectedHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
