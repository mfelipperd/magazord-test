import MultiSelect from "./components/MultiSelect";
import MobileFilter from "./components/MobileFilter";
import { useGithubApi } from "../../services/githubApi";
import { useSerachBarController } from "./searchBar.controller";
import { Icon } from "@iconify/react/dist/iconify.js";

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

      <div className="relative flex items-center bg-neutral-100 md:bg-white border-b border-custom-gray-50 py-5 md:py-2 px-3 pl-0 rounded-md w-full lg:max-w-[600px]">
        <Icon
          icon="lineicons:search-1"
          className="absolute left-3 text-custom-gray-300 cursor-pointer w-5 h-5"
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
          className="w-full bg-transparent outline-none text-gray-700 px-10 placeholder:pl-2 placeholder:text-custom-gray-300 placeholder:text-lg"
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
