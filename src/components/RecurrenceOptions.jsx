import React, { useContext } from 'react';
import { DatePickerContext } from './DatePicker';

// This component handles the recurrence options for the date picker
const RecurrenceOptions = () => {
  // Destructure values and functions from the DatePickerContext
  const {
    recurrenceType,
    setRecurrenceType,
    recurrenceInterval,
    setRecurrenceInterval,
    selectedDays,
    setSelectedDays,
    nthDay,
    setNthDay,
  } = useContext(DatePickerContext);

  // Function to toggle selected days for weekly recurrence
  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-4">
      {/* Dropdown for selecting recurrence type */}
      <select
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
      >
        <option value="once">Once</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Show interval input for recurring events */}
      {recurrenceType !== 'once' && (
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-700">Every</label>
          <input
            type="number"
            min="1"
            value={recurrenceInterval}
            onChange={(e) => setRecurrenceInterval(parseInt(e.target.value))}
            className="w-16 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
          <span className="capitalize text-sm text-gray-700">
            {recurrenceType === 'daily' ? 'days' : recurrenceType === 'weekly' ? 'weeks' : recurrenceType === 'monthly' ? 'months' : 'years'}
          </span>
        </div>
      )}

      {/* Show day selection for weekly recurrence */}
      {recurrenceType === 'weekly' && (
        <div>
          <label className="block mb-2 text-sm text-gray-700">On</label>
          <div className="flex flex-wrap gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <button
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedDays.includes(day) ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
                } hover:bg-indigo-400 transition-all`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show options for monthly recurrence */}
      {recurrenceType === 'monthly' && (
        <div className="space-y-2">
          <label className="block text-sm text-gray-700">On the</label>
          {/* Dropdown for selecting nth day of the month */}
          <select
            value={nthDay}
            onChange={(e) => setNthDay(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          >
            {[1, 2, 3, 4, -1].map((n) => (
              <option key={n} value={n}>
                {n === -1 ? 'Last' : `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`}
              </option>
            ))}
          </select>
          {/* Dropdown for selecting day of the week */}
          <select
            value={selectedDays[0] || ''}
            onChange={(e) => setSelectedDays([e.target.value])}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;