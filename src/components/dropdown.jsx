import React from "react";
import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

export default function dropdown() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="mx-auto h-screen w-52 pt-20">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          {/* Input Field */}
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-sm text-black",
              "focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(person) => person?.name}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          </ComboboxButton>
        </div>

        {/* Dropdown Menu */}
        {filteredPeople.length > 0 && (
          <div className="absolute mt-1 w-half bg-white border border-gray-300 rounded-md shadow-lg">
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
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
                    {person.name}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </div>
        )}
      </Combobox>
    </div>
  );
}
