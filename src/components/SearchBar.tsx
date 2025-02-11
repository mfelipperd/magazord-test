import { BiSearch } from "react-icons/bi";
import MultiSelect from "./MultiSelect";
import MobileFilter from "./MobileFilter";
import { useGithubApi } from "../services/githubApi";
import { useSearchStore } from "../store/useSearchStore"; // 🆕 Importamos o Zustand

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { languages, repoTypes } = useGithubApi("facebook");

  // 🆕 Agora usamos Zustand para armazenar os filtros globalmente
  const {
    searchValue,
    selectedLanguages,
    selectedRepoTypes,
    setSearchValue,
    setSelectedLanguages,
    setSelectedRepoTypes,
  } = useSearchStore();

  return (
    <div className="flex flex-col gap-3 w-full md:flex-col lg:flex-row lg:items-center lg:justify-between">
      {/* 🔥 Tablet: Selects acima da barra de pesquisa */}
      <div className="hidden md:flex gap-3 lg:hidden w-full max-w-56">
        <MultiSelect
          options={repoTypes}
          selectedOptions={selectedRepoTypes}
          setSelectedOptions={setSelectedRepoTypes}
          placeholder="Type"
        />
        <MultiSelect
          options={languages as string[]}
          selectedOptions={selectedLanguages}
          setSelectedOptions={setSelectedLanguages}
          placeholder="Language"
        />
      </div>

      {/* 🔥 Barra de Pesquisa */}
      <div className="relative flex items-center border-b border-gray-300 py-2 px-3 bg-neutral-100 rounded-md w-full lg:max-w-[600px]">
        <BiSearch
          size={24}
          className="absolute right-3 text-blue-500"
          onClick={() => onSearch(searchValue)}
        />

        {/* 🔥 Mobile: Renderiza MobileFilter em vez de MultiSelect */}
        <div className="absolute left-10 flex gap-2 md:hidden">
          <MobileFilter
            options={repoTypes}
            selectedOptions={selectedRepoTypes}
            setSelectedOptions={setSelectedRepoTypes}
            placeholder="Type"
          />
          <MobileFilter
            options={languages as string[]}
            selectedOptions={selectedLanguages}
            setSelectedOptions={setSelectedLanguages}
            placeholder="Language"
          />
        </div>

        {/* 🔥 Input */}
        <input
          type="text"
          placeholder="Search Here"
          className="w-full bg-transparent outline-none text-gray-700 px-10"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      {/* 🔥 Desktop: Selects ao lado da barra de pesquisa */}
      <div className="hidden lg:flex gap-3">
        <MultiSelect
          options={repoTypes}
          selectedOptions={selectedRepoTypes}
          setSelectedOptions={setSelectedRepoTypes}
          placeholder="Type"
        />
        <MultiSelect
          options={languages as string[]}
          selectedOptions={selectedLanguages}
          setSelectedOptions={setSelectedLanguages}
          placeholder="Language"
        />
      </div>
    </div>
  );
}
