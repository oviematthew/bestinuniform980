import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/20/solid";

export default function DatePickerItem({ currentDate, setCurrentDate }) {
  return (
    <div className="relative w-full">
      <DatePicker
        selected={currentDate}
        minDate={new Date()}
        maxDate={new Date()}
        onChange={(date) => setCurrentDate(date)}
        placeholderText="Select a date"
        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={true}
      />
      {/* Calendar Icon */}
      <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
}
