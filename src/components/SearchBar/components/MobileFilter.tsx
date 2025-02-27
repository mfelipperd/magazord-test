import { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiX } from "react-icons/bi";

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
        className="w-full bg-gradient-to-r from-blue-800 to-blue-400 text-white px-4 py-2 rounded-full flex items-center justify-between md:hidden"
      >
        <span className="truncate">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
        </span>
        <BiChevronDown />
      </button>
      <div
        className={`fixed inset-0  bg-opacity-50 flex justify-center items-end md:hidden z-50 transition-all duration-700 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          ref={dropdownRef}
          className={`fixed -bottom-0 ] bg-white w-[100%] max-h-[80vh] h-0 rounded-t-lg p-4  overflow-hidden transition-all duration-700 ${
            isOpen ? "h-[30rem]" : "h-0"
          }`}
        >
          <div className="bg-gray-400 h-2 rounded-full mx-44 mb-8"></div>
          <div className="w-full flex justify-between items-center ">
            <h2 className="text-2xl font-semibold">{placeholder}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className=" text-red-500 text-xl cursor-pointer"
            >
              <BiX size={24} />
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
                  className="cursor-pointer"
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
