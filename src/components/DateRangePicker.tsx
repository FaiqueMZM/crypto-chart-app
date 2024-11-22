import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({
  onChange,
}: {
  onChange: (start: string, end: string) => void;
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);

    if (start && end) {
      onChange(
        start.toISOString().split("T")[0],
        end.toISOString().split("T")[0]
      );
    }
  };

  return (
    <div>
      <label
        htmlFor="currency"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Select Date
      </label>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  );
};

export default DateRangePicker;
