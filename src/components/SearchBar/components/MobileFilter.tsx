import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronDown } from "akar-icons";
import { useState, useRef, useEffect } from "react";

interface MobileFilterProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  placeholder: string;
}

export default function MobileFilter({
  options,
  selectedOptions,
  setSelectedOptions,
  placeholder,
}: MobileFilterProps) {
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full  bg-linear-to-r  gap-[10px] p2 text-sm h-[30px] font-normal from-custom-blue-500 to-custom-blue-100 text-white px-4 pr-6 rounded-full flex items-center justify-between md:hidden"
      >
        <ChevronDown size={12} strokeWidth={4} />
        <span className="truncate">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
        </span>
      </button>
      <div
        className={`fixed inset-7  bg-opacity-50 flex justify-center items-end md:hidden z-50 transition-all duration-700 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          ref={dropdownRef}
          className={`fixed -bottom-0  bg-white w-[100%] max-h-[80vh] h-0 rounded-t-lg p-4  overflow-hidden transition-all duration-700 ${
            isOpen ? "h-[30rem]" : "h-0"
          }`}
        >
          <div className="w-full flex justify-center h-8">
            <div className="bg-custom-gray-250 h-2 rounded-full w-[100px] "></div>
          </div>

          <div className="w-full flex justify-between items-center ">
            <h2 className="text-2xl font-semibold">{placeholder}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className=" text-red-500 text-xl cursor-pointer"
            >
              <Icon icon="tabler:x" className="h-6 w-6" />{" "}
            </button>
          </div>

          <div className=" mt-4 max-h-[60vh] overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`cursor-pointer flex items-center gap-2 px-3 py-2 bg-white rounded-md ${
                  selectedOptions.includes(option) ? "bg-blue-100" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="cursor-pointer w-5 h-5 border-custom-gray-270 border-[1px] mr-2"
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
