import { Input } from "@headlessui/react";

export default function TextInput({ placeholder, value, onChange, ariaLabel }) {
  return (
    <Input
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-[70%] my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      name="full_name"
      type="text"
    />
  );
}
