import React, { useContext, useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { DatePickerContext } from './DatePicker';

// This component handles the date input fields for start and end dates
const DateInput = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useContext(DatePickerContext);
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);

  // Set initial end date to start date when component mounts
  useEffect(() => {
    setEndDate(new Date(startDate));
  }, []);

  // Handle changes to the start date
  const handleStartDateChange = (e) => {
    const newStartDate = new Date(e.target.value);
    setStartDate(newStartDate);
    
    // Update end date if it's before the new start date
    if (!isEndDateEnabled || endDate < newStartDate) {
      setEndDate(newStartDate);
    }
  };

  // Handle changes to the end date
  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  // Toggle end date input field
  const toggleEndDate = () => {
    setIsEndDateEnabled(!isEndDateEnabled);
    if (!isEndDateEnabled) {
      setEndDate(new Date(startDate));
    }
  };

  return (
    <div className="space-y-4">
      {/* Start date input */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={handleStartDateChange}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
      </div>
      {/* Checkbox to enable/disable end date */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableEndDate"
          checked={isEndDateEnabled}
          onChange={toggleEndDate}
          className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="enableEndDate" className="text-sm text-gray-700">Enable End Date</label>
      </div>
      {/* End date input */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="date"
          value={endDate.toISOString().split('T')[0]}
          onChange={handleEndDateChange}
          disabled={!isEndDateEnabled}
          className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm ${
            !isEndDateEnabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default DateInput;