import React, { useContext } from 'react';
import './index.css';
import dayjs, { Dayjs } from 'dayjs';
import LocaleContext from './LocaleContext.tsx';
import allLocales from './locale/index.ts';

interface IProps {
  value: Dayjs;
  prevMonthHandler?: () => void;
  nextMonthHandler?: () => void;
  BackToTodayHandler?: () => void;
}
export default function Header(props: IProps) {
  const { value, prevMonthHandler, nextMonthHandler, BackToTodayHandler } =
    props;

  const localeContext = useContext(LocaleContext);
  const locale = allLocales[localeContext.locale || 'zh-CN'];

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className="calendar-header-text">
          {value.format(locale.formatMonth)}
        </div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>
          &gt;
        </div>
        <div className="calendar-header-btn" onClick={BackToTodayHandler}>
          {locale.today}
        </div>
      </div>
    </div>
  );
}
