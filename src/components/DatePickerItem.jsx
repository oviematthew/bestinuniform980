import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerItem({ startDate, setStartDate }) {
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
}
