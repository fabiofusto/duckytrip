"use client";

import { FC } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
  return (
    <DateRange
      rangeColors={["#057A55"]}
      ranges={[value]}
      date={new Date()}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      onChange={onChange}
    />
  );
};

export default Calendar;
