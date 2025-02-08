import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import React from 'react'

export default function Dialog() {

 let [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-slate-500 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-bold text-white">
                Reset Votes
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white">
                Are you sure you want to reset Votes?
              </p>
              <div className=" flex gap-3 mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-5 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-black data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-white-700"
                  onClick={closeModal}
                >
                  Nope
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-700  data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={affirmReset}
                >
                  Yep
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}
