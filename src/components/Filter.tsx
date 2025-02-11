import { useState } from "react";
import { BiChevronDown, BiX } from "react-icons/bi";

interface FiltersProps {
  languages: string[];
  types: string[];
  selectedLanguages: string[];
  selectedTypes: string[];
  onLanguageChange: (selected: string[]) => void;
  onTypeChange: (selected: string[]) => void;
}

export default function Filters({
  languages,
  types,
  selectedLanguages,
  selectedTypes,
  onLanguageChange,
  onTypeChange,
}: FiltersProps) {
  const [activeFilter, setActiveFilter] = useState<"type" | "language" | null>(
    null,
  );

  // Função para alternar seleção
  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (values: string[]) => void,
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  return (
    <>
      {/* Desktop & Tablet: Selects normais */}
      <div className="hidden md:flex gap-3">
        <select
          className="bg-gradient-to-r from-blue-800 to-blue-400 text-white px-4 py-2 rounded-full cursor-pointer"
          multiple
          value={selectedTypes}
          onChange={(e) =>
            onTypeChange(
              Array.from(e.target.selectedOptions, (option) => option.value),
            )
          }
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="bg-gradient-to-r from-blue-800 to-blue-400 text-white px-4 py-2 rounded-full cursor-pointer"
          multiple
          value={selectedLanguages}
          onChange={(e) =>
            onLanguageChange(
              Array.from(e.target.selectedOptions, (option) => option.value),
            )
          }
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile: Botões que abrem o modal */}
      <div className="md:hidden flex gap-3">
        <button
          className="bg-gradient-to-r from-blue-800 to-blue-400 text-white px-4 py-2 rounded-full flex items-center gap-2"
          onClick={() => setActiveFilter("type")}
        >
          <BiChevronDown /> Type
        </button>
        <button
          className="bg-gradient-to-r from-blue-800 to-blue-400 text-white px-4 py-2 rounded-full flex items-center gap-2"
          onClick={() => setActiveFilter("language")}
        >
          <BiChevronDown /> Language
        </button>
      </div>

      {/* Mobile: Modal de Filtros */}
      {activeFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white w-full max-h-[80%] rounded-t-2xl p-6 shadow-lg overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                {activeFilter === "type" ? "Type" : "Language"}
              </h2>
              <button
                onClick={() => setActiveFilter(null)}
                className="text-red-500 text-lg"
              >
                <BiX />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {(activeFilter === "type" ? types : languages).map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      activeFilter === "type"
                        ? selectedTypes.includes(item)
                        : selectedLanguages.includes(item)
                    }
                    onChange={() =>
                      activeFilter === "type"
                        ? toggleSelection(item, selectedTypes, onTypeChange)
                        : toggleSelection(
                            item,
                            selectedLanguages,
                            onLanguageChange,
                          )
                    }
                    className="w-5 h-5"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
