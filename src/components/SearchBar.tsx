import { BiSearch } from "react-icons/bi";
import MultiSelect from "./MultiSelect";
import MobileFilter from "./MobileFilter";
import { useGithubApi } from "../services/githubApi";
import { useSearchStore } from "../store/useSearchStore";
import { useState } from "react";
import { useRepoStore } from "../store/useRepoStore";

export default function SearchBar() {
  const { languages, repoTypes } = useGithubApi();

  const [focus, setFocus] = useState<boolean>(false);

  const { repositories, setRepositories, resetRepositories } = useRepoStore();

  const {
    searchValue,
    selectedLanguages,
    selectedRepoTypes,
    setSearchValue,
    setSelectedLanguages,
    setSelectedRepoTypes,
  } = useSearchStore();

  const handleSearch = () => {
    if (!searchValue.trim()) {
      resetRepositories();
      return;
    }

    const filteredRepos = repositories.filter((repo) =>
      Object.values(repo).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );

    setRepositories(filteredRepos);
  };

  const onBlur = () => {
    if (!searchValue.trim()) {
      if (!searchValue) {
        resetRepositories();
      }
      setFocus(false);
    }
  };
  return (
    <div className="flex flex-col gap-3 w-full md:flex-col lg:flex-row lg:items-center lg:justify-between">
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

      <div className="relative flex items-center bg-neutral-100 md:bg-white border-b border-gray-300 py-5 md:py-2 px-3 pl-0  rounded-md w-full lg:max-w-[600px]">
        <BiSearch
          size={24}
          className="absolute right-3 text-blue-500 cursor-pointer"
          onClick={handleSearch}
        />

        <div
          className={`transition-all duration-500 ease-in-out absolute ${focus ? "opacity-0 z-0" : "opacity-100"} bg-neutral-100 left-3 flex gap-2 md:hidden `}
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
          onFocus={() => setFocus(true)}
          onBlur={onBlur}
          type="text"
          placeholder="Search Here"
          className="w-full bg-transparent outline-none text-gray-700 px-10"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>

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
