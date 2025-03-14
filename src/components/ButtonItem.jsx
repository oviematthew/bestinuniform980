import React from "react";
import { Button } from "@headlessui/react";

export default function ButtonItem({ buttonText, onClick }) {
  return (
    <div className="mt-3">
      <Button
        aria-label="Vote Now"
        type="submit"
        onClick={onClick}
        className="cursor-pointer bg-[#0046be] py-3.5 px-7 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-900 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        {buttonText}
      </Button>
    </div>
  );
}
