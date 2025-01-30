import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { loadEmployees } from "../config/Firebase";

export default function Dropdown({ labelText, placeHolder }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Load all Employees from database
  const loadAllEmployees = () => {
    loadEmployees()
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => {
        console.error("Error loading employees:", error);
      });
  };

  useEffect(() => {
    loadAllEmployees();
  }, []);

  //Filter employees for query search
  const filteredPeople =
    query === ""
      ? employees
      : employees.filter((employee) => {
          return employee.fullName.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="w-[70%] pt-4" ref={dropdownRef}>
      <Field>
        <Label className="block text-sm font-medium text-gray-700">
          {labelText}
        </Label>
        <Combobox
          value={selected}
          onChange={(value) => {
            setSelected(value);
            setOpen(false); // Close dropdown when an option is selected
            setQuery(""); // Reset input after selection
          }}
        >
          <div className="relative">
            {/* Input Field */}
            <ComboboxInput
              className={clsx(
                "w-full rounded-lg border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-sm text-black",
                "focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(event.target.value.length > 0); // Open dropdown only when typing
              }}
              displayValue={(employee) => employee?.fullName || ""}
              placeholder={placeHolder}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
              <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </ComboboxButton>
          </div>

          {/* Dropdown Menu (Only Show if Open) */}
          {open && filteredPeople.length > 0 && (
            <ComboboxOptions className="absolute mt-1 w-contain bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredPeople.map((employee) => (
                <ComboboxOption
                  key={employee.id}
                  value={employee}
                  className={({ focus, selected }) =>
                    clsx(
                      "cursor-pointer select-none py-2 px-4 text-sm",
                      focus ? "bg-blue-500 text-white" : "text-black",
                      selected && "font-semibold"
                    )
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-2">
                      {selected && <CheckIcon className="w-4 h-4 text-black" />}
                      {employee.fullName}
                    </div>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </Combobox>
      </Field>
    </div>
  );
}
