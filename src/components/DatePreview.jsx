import React, { useContext, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DatePickerContext } from "./DatePicker";

// DatePreview component: Displays a calendar view of selected dates
const DatePreview = () => {
  // Extract necessary values from DatePickerContext
  const {
    startDate,
    endDate,
    recurrenceType,
    recurrenceInterval,
    selectedDays,
    nthDay,
  } = useContext(DatePickerContext);

  // State to keep track of the currently displayed month
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate));

  // Helper function: Get the number of days in a given month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to generate all recurring dates based on selected options
  const getRecurringDates = () => {
    const dates = [];
    let currentDate = new Date(startDate);
    // If no end date is set, default to one year from start date
    const endDateValue =
      endDate ||
      new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate()
      );

    // Iterate through all dates from start to end
    while (currentDate <= endDateValue) {
      if (isRecurringDate(currentDate)) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Function to check if a given date is a recurring date
  const isRecurringDate = (date) => {
    // For non-recurring events, only the start date is selected
    if (recurrenceType === "once") {
      return date.getTime() === startDate.getTime();
    }

    // Calculate days since the start date
    const daysSinceStart = Math.floor(
      (date - startDate) / (1000 * 60 * 60 * 24)
    );

    // Check recurrence based on the selected type
    switch (recurrenceType) {
      case "daily":
        // Check if the day difference is divisible by the interval
        return daysSinceStart % recurrenceInterval === 0;
      case "weekly":
        // Check if the week difference is divisible by the interval and the day is selected
        return (
          daysSinceStart % (7 * recurrenceInterval) === 0 &&
          selectedDays.includes(
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
          )
        );
      case "monthly":
        if (nthDay > 0) {
          // For positive nthDay, check if it's the nth day of the month
          return (
            date.getDate() === Math.min(nthDay, getDaysInMonth(date)) &&
            (date.getMonth() -
              startDate.getMonth() +
              12 * (date.getFullYear() - startDate.getFullYear())) %
              recurrenceInterval ===
              0
          );
        } else {
          // For negative nthDay (last day of month)
          const lastDayOfMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
          ).getDate();
          return (
            date.getDate() === lastDayOfMonth &&
            (date.getMonth() -
              startDate.getMonth() +
              12 * (date.getFullYear() - startDate.getFullYear())) %
              recurrenceInterval ===
              0
          );
        }
      case "yearly":
        // Check if it's the same day and month, and the year difference is divisible by the interval
        return (
          date.getMonth() === startDate.getMonth() &&
          date.getDate() === startDate.getDate() &&
          (date.getFullYear() - startDate.getFullYear()) %
            recurrenceInterval ===
            0
        );
      default:
        return false;
    }
  };

  // Get all recurring dates based on the current settings
  const recurringDates = getRecurringDates();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Selected Dates
      </h3>
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
              )
            )
          }
          className="text-gray-500 hover:text-gray-700 transition-all"
        >
          <ChevronLeft />
        </button>
        <span className="text-gray-700 text-sm">
          {currentMonth.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
              )
            )
          }
          className="text-gray-500 hover:text-gray-700 transition-all"
        >
          <ChevronRight />
        </button>
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Weekday headers */}
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-xs font-semibold text-gray-500">
            {day}
          </div>
        ))}
        {/* Empty cells for days before the 1st of the month */}
        {Array.from(
          {
            length: new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              1
            ).getDay(),
          },
          (_, i) => (
            <div key={`empty-${i}`} className="p-1" />
          )
        )}
        {/* Calendar days */}
        {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
          const currentDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            i + 1
          );
          const isSelected = recurringDates.some(
            (d) =>
              d.getDate() === currentDate.getDate() &&
              d.getMonth() === currentDate.getMonth() &&
              d.getFullYear() === currentDate.getFullYear()
          );
          return (
            <div
              key={i}
              className={`p-1 rounded-md text-sm ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePreview;