import { BiChevronDown, BiSearch } from "react-icons/bi";

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 w-full md:flex-row md:items-center md:justify-between">
      {/* 🔥 Filtros */}
      <div className="flex  gap-3">
        <button
          type="button"
          className="bg-gradient-to-r from-blue-800 to-blue-400 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <BiChevronDown />
          Type
        </button>
        <button
          type="button"
          className="bg-gradient-to-r from-blue-800 to-blue-400 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <BiChevronDown />
          Language
        </button>
      </div>

      {/* 🔥 Barra de Pesquisa */}
      <div className="relative flex items-center border-b border-gray-300 py-2 px-3 bg-neutral-100 rounded-md w-full md:max-w-[400px] lg:max-w-[600px]">
        <input
          type="text"
          placeholder="Search Here"
          className="w-full bg-transparent outline-none text-gray-700 px-2"
          onChange={(e) => onSearch(e.target.value)}
        />
        <BiSearch size={24} className="absolute right-3 text-blue-500" />
      </div>
    </div>
  );
}
