import React, { createContext, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import DateInput from './DateInput';
import RecurrenceOptions from './RecurrenceOptions';
import DatePreview from './DatePreview';

// Create a context to share state between components
export const DatePickerContext = createContext();

// Main DatePicker component
const DatePicker = ({ onChange }) => {
  // State variables for date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [recurrenceType, setRecurrenceType] = useState('once');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [nthDay, setNthDay] = useState(1);

  // Create an object with all the context values
  const contextValue = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    recurrenceType,
    setRecurrenceType,
    recurrenceInterval,
    setRecurrenceInterval,
    selectedDays,
    setSelectedDays,
    nthDay,
    setNthDay,
    onChange,
  };

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <CalendarIcon className="w-8 h-8 text-indigo-500 mr-2" />
          <h2 className="text-2xl font-bold text-indigo-700">Event Scheduler</h2>
        </div>
        <div className="flex space-x-6">
          {/* Left column: Date preview */}
          <div className="w-1/2 bg-white rounded-lg p-4 shadow-md">
            <DatePreview />
          </div>
          {/* Right column: Date input and recurrence options */}
          <div className="w-1/2 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Date Selection</h3>
              <DateInput />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Recurrence</h3>
              <RecurrenceOptions />
            </div>
          </div>
        </div>
      </div>
    </DatePickerContext.Provider>
  );
};

export default DatePicker;