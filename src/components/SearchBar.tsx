import { BiChevronDown, BiSearch } from "react-icons/bi";

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  console.log(onSearch);
  return (
    <div className="relative flex  items-center gap-3 p-4 bg-neutral-100 h-14">
      <button
        type="submit"
        className="bg-gradient-to from- bg-blue-800  to-bg-blue-200 text-white px-6 py-2 rounded-full flex items-center gap-2"
      >
        <BiChevronDown />
        Type
      </button>
      <button
        type="submit"
        className="bg-gradient-to from- bg-blue-800  to-bg-blue-200 text-white px-6 py-2 rounded-full flex items-center gap-2"
      >
        <BiChevronDown />
        Language
      </button>
      <BiSearch size={24} className="absolute right-2 text-blue-500" />
    </div>
  );
}
