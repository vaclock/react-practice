import React, { JSX, useContext, useState } from 'react';
import './index.css';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarProps } from '.';
import LocaleContext from './LocaleContext.tsx';
import allLocales from './locale/index.ts';
import classNames from 'classnames';

type DaysInfo = Array<{ date: Dayjs; isCurrentMonth: boolean }>;
function getAllDay(date: Dayjs) {
  const startDate = date.startOf('month');
  const day = startDate.day();
  const daysInfo: DaysInfo = new Array(6 * 7);
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      isCurrentMonth: false,
    };
  }
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');
    daysInfo[i] = {
      date: calcDate,
      isCurrentMonth: calcDate.month() === date.month(),
    };
  }
  return daysInfo;
}
interface MonthCalendarProps extends CalendarProps {
  selectedHandler?: (date: Dayjs) => void;
}
export default function MonthCalendar(props: MonthCalendarProps) {
  const { value, dateRender, dateInnerContent, selectedHandler } = props;
  const localeContext = useContext(LocaleContext);
  const locale = allLocales[localeContext.locale || 'zh-CN'];

  const weekList = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  // [26, 27, 28, 29, 30, 1, 2, 3, ..., 30, 31, 1, 2, 3]
  const daysInfo = getAllDay(value);

  const renderDate = (
    days: DaysInfo,
    dateRender?: MonthCalendarProps['dateRender'],
    dateInnerContent?: MonthCalendarProps['dateInnerContent'],
    value?: Dayjs,
    selectedHandler?: MonthCalendarProps['selectedHandler']
  ) => {
    const rows: JSX.Element[][] = [];
    for (let row = 0; row < 6; row++) {
      const cols: JSX.Element[] = [];
      for (let col = 0; col < 7; col++) {
        const item = days[row * 7 + col];
        cols[col] = (
          <div
            className={`calendar-month-body-cell ${item.isCurrentMonth ? 'calendar-month-body-cell-current' : ''}`}
            onClick={() => {
              selectedHandler?.(item?.date);
            }}
          >
            {dateRender ? (
              dateRender(item?.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={classNames(
                    'calendar-month-body-cell-date-value',
                    value?.format('YYYY-MM-DD') ===
                      item?.date.format('YYYY-MM-DD')
                      ? 'calendar-month-body-cell-date-value-selected'
                      : ''
                  )}
                >
                  {item?.date.format('D')}
                </div>
                {dateInnerContent && (
                  <div className="calendar-month-body-cell-date-content">
                    {dateInnerContent?.(item?.date)}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }
      rows.push(cols);
    }
    return rows.map((row) => (
      <div className="calendar-month-body-row">{row}</div>
    ));
  };

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => {
          return (
            <div className="calendar-month-week-list-item">
              {locale.week[week]}
            </div>
          );
        })}
      </div>
      <div className="calendar-month-body">
        {renderDate(
          daysInfo,
          dateRender,
          dateInnerContent,
          value,
          selectedHandler
        )}
      </div>
    </div>
  );
}
