import { ChevronDown } from "akar-icons";
import { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  placeholder: string;
}

export default function MultiSelect({
  options,
  selectedOptions,
  setSelectedOptions,
  placeholder,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" bg-linear-to-r  lg:h-10 md:h-8 from-custom-blue-500 to-custom-blue-100 text-white px-2 pr-6 py-2 rounded-full flex items-center  gap-[10px]"
      >
        <ChevronDown
          size={12}
          strokeWidth={4}
          className={`transform transition   ${isOpen ? "rotate-180" : ""}`}
        />

        <span className="truncate lg:text-lg  md:text-sm font-normal">
          {selectedOptions.length > 0
            ? `${selectedOptions.length} selected`
            : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-lg p-2 max-h-60 overflow-auto z-50 min-w-fit">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={`cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md ${
                selectedOptions.includes(option) ? "bg-blue-100" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
                className="cursor-pointer"
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
