import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { User, Briefcase } from "lucide-react"; // Importing icons

const options = [
  {
    value: "landOwner",
    label: "Exploitant",
    icon: <User className="w-5 h-5 text-blue-500" />, // Icon for landOwner
  },
  {
    value: "worker",
    label: "Travailleur",
    icon: <Briefcase className="w-5 h-5 text-green-500" />, // Icon for worker
  },
];

const RadioCardsDemo = () => {
  return (
    <RadioGroup.Root
      defaultValue={options[0].value}
      className="max-w-sm w-full grid grid-cols-2 gap-4"
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className="ring-[1px] ring-border rounded py-3 px-4 flex items-center gap-2 data-[state=checked]:ring-2 data-[state=checked]:ring-earth-600"
        >
          {option.icon} {/* Display the icon */}
          <span className="font-semibold tracking-tight">{option.label}</span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};

export default RadioCardsDemo;
