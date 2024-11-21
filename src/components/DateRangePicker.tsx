import React, { useState } from "react";

const DateRangePicker = ({
  onChange,
}: {
  onChange: (start: string, end: string) => void;
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    onChange(startDate, endDate);
  };

  return (
    <div className="flex space-x-2">
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleApply} className="p-2 bg-blue-500 text-white">
        Apply
      </button>
    </div>
  );
};

export default DateRangePicker;
