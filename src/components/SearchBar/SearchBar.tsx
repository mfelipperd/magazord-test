import { BiSearch } from "react-icons/bi";
import MultiSelect from "./components/MultiSelect";
import MobileFilter from "./components/MobileFilter";
import { useGithubApi } from "../../services/githubApi";
import { useSerachBarController } from "./searchBar.controller";

export default function SearchBar() {
  const { languages, repoTypes } = useGithubApi();
  const controller = useSerachBarController();
  return (
    <div className="flex flex-col gap-3 w-full md:flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="hidden md:flex gap-3 lg:hidden w-full max-w-56">
        <MultiSelect
          options={repoTypes}
          selectedOptions={controller.selectedRepoTypes}
          setSelectedOptions={controller.setSelectedRepoTypes}
          placeholder="Type"
        />
        <MultiSelect
          options={languages as string[]}
          selectedOptions={controller.selectedLanguages}
          setSelectedOptions={controller.setSelectedLanguages}
          placeholder="Language"
        />
      </div>

      <div className="relative flex items-center bg-neutral-100 md:bg-white border-b border-gray-300 py-5 md:py-2 px-3 pl-0 rounded-md w-full lg:max-w-[600px]">
        <BiSearch
          size={24}
          className="absolute right-3 text-blue-500 cursor-pointer"
          onClick={() => controller.handleSearch(true)}
        />

        <div
          className={`transition-all duration-500 ease-in-out absolute ${
            controller.focus ? "opacity-0 z-0" : "opacity-100"
          } bg-neutral-100 left-3 flex gap-2 md:hidden`}
        >
          <MobileFilter
            options={repoTypes}
            selectedOptions={controller.selectedRepoTypes}
            setSelectedOptions={controller.setSelectedRepoTypes}
            placeholder="Type"
          />
          <MobileFilter
            options={languages as string[]}
            selectedOptions={controller.selectedLanguages}
            setSelectedOptions={controller.setSelectedLanguages}
            placeholder="Language"
          />
        </div>

        <input
          type="text"
          placeholder="Search Here"
          className="w-full bg-transparent outline-none text-gray-700 px-10"
          value={controller.searchValue}
          onFocus={() => controller.setFocus(true)}
          onBlur={controller.onBlur}
          onChange={(e) => controller.setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              controller.handleSearch(true);
            }
          }}
        />
      </div>

      <div className="hidden lg:flex gap-3">
        <MultiSelect
          options={repoTypes}
          selectedOptions={controller.selectedRepoTypes}
          setSelectedOptions={controller.setSelectedRepoTypes}
          placeholder="Type"
        />
        <MultiSelect
          options={languages as string[]}
          selectedOptions={controller.selectedLanguages}
          setSelectedOptions={controller.setSelectedLanguages}
          placeholder="Language"
        />
      </div>
    </div>
  );
}
