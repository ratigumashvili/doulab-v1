import { Popover, Transition } from "@headlessui/react";
import { HelpCircle } from "lucide-react";

const HelpPopover = ({ text }) => {
  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none">
        <HelpCircle size={18} />
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10 bottom-3 left-6 p-2 bg-white shadow-sm border rounded-[0.25rem]">
          <div className="min-w-[200px] text-sm leading-6 text-gray-700">
            {text}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default HelpPopover;
