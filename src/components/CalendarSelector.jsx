import React, { useEffect, useState } from "react";

const CalendarSelector = ({formData, setFormData}) => {
  const months = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDay, setSelectedDay] = useState(1);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month, year) => {
    if (month === "February" && isLeapYear(year)) {
      return 29;
    } else {
      return months[month];
    }
  };

  const years = Array.from({ length: 125 }, (_, i) => i + 1900);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
    }));
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);

    const daysInMonth = getDaysInMonth(selectedMonth, newYear);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);

    const daysInMonth = getDaysInMonth(newMonth, selectedYear);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value));
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <select
        value={selectedDay}
        onChange={handleDayChange}
        className="input w-full"
      >
        {Array.from(
          { length: getDaysInMonth(selectedMonth, selectedYear) },
          (_, i) => i + 1
        ).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="input w-full"
      >
        {Object.keys(months).map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={handleYearChange}
        className="input w-full"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CalendarSelector;
