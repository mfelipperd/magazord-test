import { BiSearch } from "react-icons/bi";
import MultiSelect from "./MultiSelect";
import MobileFilter from "./MobileFilter";
import { useGithubApi } from "../services/githubApi";
import { useSearchStore } from "../store/useSearchStore";
import { useState, useEffect } from "react";
import { useRepoStore } from "../store/useRepoStore";

export default function SearchBar() {
  const { languages, repoTypes } = useGithubApi();
  const [focus, setFocus] = useState<boolean>(false);

  const {
    searchValue,
    selectedLanguages,
    selectedRepoTypes,
    setSearchValue,
    setSelectedLanguages,
    setSelectedRepoTypes,
  } = useSearchStore();

  const { originalRepositories, setRepositories, resetRepositories } =
    useRepoStore();

  // 🔥 Agora só atualiza os resultados quando os filtros de linguagem ou tipo mudam
  useEffect(() => {
    handleSearch(false); // ⚡ A busca automática NÃO considera a palavra-chave
  }, [selectedLanguages, selectedRepoTypes]);

  const handleSearch = (includeSearchValue: boolean) => {
    const trimmedSearch = searchValue.trim().toLowerCase();

    if (
      !includeSearchValue &&
      selectedLanguages.length === 0 &&
      selectedRepoTypes.length === 0
    ) {
      resetRepositories();
      return;
    }

    const filteredRepos = originalRepositories.filter((repo) => {
      // 🔍 Palavra-chave só é considerada quando "includeSearchValue" for true
      const matchesSearch =
        !includeSearchValue ||
        trimmedSearch === "" ||
        Object.values(repo).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(trimmedSearch),
        );

      // 🌍 Filtro por linguagem (sempre ativo)
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(repo.language);

      // 🏷 Filtro por tipo de repositório (sempre ativo)
      const matchesRepoType =
        selectedRepoTypes.length === 0 ||
        selectedRepoTypes.some((type) => {
          switch (type) {
            case "Forks":
              return repo.fork === true;
            case "Archived":
              return repo.archived === true;
            case "Mirrors":
              return repo.mirror_url !== null;
            case "Sources":
              return (
                repo.fork === false &&
                repo.archived === false &&
                repo.mirror_url === null
              );
            case "All":
              return true;
            default:
              return false;
          }
        });

      return matchesSearch && matchesLanguage && matchesRepoType;
    });

    setRepositories(filteredRepos);
  };

  const onBlur = () => {
    if (!searchValue.trim()) {
      setFocus(false);
      resetRepositories();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full md:flex-col lg:flex-row lg:items-center lg:justify-between">
      {/* Filtros para desktop */}
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

      {/* Barra de pesquisa */}
      <div className="relative flex items-center bg-neutral-100 md:bg-white border-b border-gray-300 py-5 md:py-2 px-3 pl-0 rounded-md w-full lg:max-w-[600px]">
        <BiSearch
          size={24}
          className="absolute right-3 text-blue-500 cursor-pointer"
          onClick={() => handleSearch(true)} // 🔍 Agora a busca manual inclui a palavra-chave
        />

        {/* Filtros para mobile (somem quando o input tem foco) */}
        <div
          className={`transition-all duration-500 ease-in-out absolute ${
            focus ? "opacity-0 z-0" : "opacity-100"
          } bg-neutral-100 left-3 flex gap-2 md:hidden`}
        >
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

        <input
          type="text"
          placeholder="Search Here"
          className="w-full bg-transparent outline-none text-gray-700 px-10"
          value={searchValue}
          onFocus={() => setFocus(true)}
          onBlur={onBlur}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(true); // 🔍 Agora só filtra a palavra-chave ao pressionar Enter
            }
          }}
        />
      </div>

      {/* Filtros para desktop */}
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
