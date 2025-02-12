import { useEffect, useState } from "react";
import { useSearchStore } from "../../store/useSearchStore";
import { useRepoStore } from "../../store/useRepoStore";

export const useSerachBarController = () => {
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
      const matchesSearch =
        !includeSearchValue ||
        trimmedSearch === "" ||
        Object.values(repo).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(trimmedSearch),
        );

      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(repo.language);

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

  useEffect(() => {
    handleSearch(false);
  }, [selectedLanguages, selectedRepoTypes]);
  return {
    onBlur,
    setSearchValue,
    setSelectedLanguages,
    setSelectedRepoTypes,
    focus,
    handleSearch,
    selectedRepoTypes,
    selectedLanguages,
    setFocus,
    searchValue,
  };
};
