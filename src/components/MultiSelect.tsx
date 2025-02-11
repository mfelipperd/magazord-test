import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

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

  // Fecha o dropdown ao clicar fora
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

  // Alternar seleção de opções
  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      {/* Botão para abrir o menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-blue-800 to-blue-400 text-white px-4 py-2 rounded-full flex items-center justify-between"
      >
        <span className="truncate">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
        </span>
        <BiChevronDown
          className={`transform transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Opções Dropdown */}
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
