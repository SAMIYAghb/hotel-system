import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const MyDateRangePicker = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    calculateNumberOfNights();
  }, [dateRange]);

  const calculateNumberOfNights = () => {
    const { startDate, endDate } = dateRange;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // Call the onDateChange prop with the updated date range and number of nights
    if (onDateChange) {
      onDateChange({
        startDate,
        endDate,
        numberOfNights: Math.max(0, differenceInDays),
      });
    }
  };

  const handleChange = (ranges) => {
    setDateRange(ranges.selection);
  };

  return (
    <DateRangePicker
      cssClass="customCSS"
      ranges={[dateRange]}
      onChange={handleChange}
    />
  );
};

export default MyDateRangePicker;
