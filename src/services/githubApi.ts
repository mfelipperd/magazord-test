/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { fetcher } from "../utils/fetcher";

const GITHUB_API_BASE_URL = "https://api.github.com/users";
const GITHUB_REPO_BASE_URL = "https://api.github.com/repos";

export function useGithubApi(initialUsername: string) {
  const [username, setUsername] = useState(initialUsername);
  const [manualFetchTrigger, setManualFetchTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { selectedLanguages, selectedRepoTypes } = useSearchStore();

  const { data: githubUser, error: userError } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const {
    data: repositories,
    error: repoError,
    isLoading: repoLoading,
    mutate: refreshRepositories,
  } = useSWR(
    username
      ? `${GITHUB_API_BASE_URL}/${username}/repos?page=${currentPage}&per_page=${itemsPerPage}${
          selectedLanguages.length > 0
            ? `&language=${selectedLanguages.join(",")}`
            : ""
        }${
          selectedRepoTypes.length > 0
            ? `&type=${selectedRepoTypes.join(",")}`
            : ""
        }`
      : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const {
    data: starredRepositories,
    error: starredError,
    isLoading: starredLoading,
    mutate: refreshStarred,
  } = useSWR(
    username
      ? `${GITHUB_API_BASE_URL}/${username}/starred?page=${currentPage}&per_page=${itemsPerPage}`
      : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const {
    data: languages,
    error: languageError,
    isLoading: languageLoading,
  } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}/repos?per_page=100` : null,
    async (url) => {
      const repos = await fetcher(url);
      return Array.from(
        new Set(repos.map((repo: any) => repo.language).filter(Boolean)),
      );
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const {
    data: repoTypes,
    error: typeError,
    isLoading: typeLoading,
  } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}/repos?per_page=100` : null,
    async (url) => {
      const repos = await fetcher(url);
      return ["All", "Sources", "Forks", "Archived", "Mirrors"].filter((type) =>
        repos.some((repo: any) => {
          switch (type) {
            case "Forks":
              return repo.fork;
            case "Archived":
              return repo.archived;
            case "Mirrors":
              return repo.mirror_url !== null;
            case "Sources":
              return !repo.fork && !repo.archived && repo.mirror_url === null;
            default:
              return true;
          }
        }),
      );
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  useEffect(() => {
    if (manualFetchTrigger) {
      console.log("🔄 Atualizando dados manualmente...");
      refreshRepositories();
      refreshStarred();
      setManualFetchTrigger(false);
    }
  }, [manualFetchTrigger, currentPage]);

  const getRepositories = () => setManualFetchTrigger(true);
  const getStarredRepositories = () => setManualFetchTrigger(true);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

  return {
    githubUser,
    repositories: repositories || [],
    starredRepositories: starredRepositories || [],
    languages: languages || [],
    repoTypes: repoTypes || [],
    getRepositories,
    getStarredRepositories,
    loading: repoLoading || starredLoading || languageLoading || typeLoading,
    error: userError || repoError || starredError || languageError || typeError,
    username,
    setUsername,
    currentPage,
    nextPage,
    prevPage,
  };
}

// 🔹 Hook para buscar detalhes do repositório
export function useRepositoryDetails(owner: string, repoName: string) {
  const { data, error, isLoading } = useSWR(
    owner && repoName ? `${GITHUB_REPO_BASE_URL}/${owner}/${repoName}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  return { repoDetails: data, error, isLoading };
}

// 🔹 Hook para buscar issues do repositório
export function useRepositoryIssues(owner: string, repoName: string) {
  const { data, error, isLoading } = useSWR(
    owner && repoName
      ? `${GITHUB_REPO_BASE_URL}/${owner}/${repoName}/issues`
      : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  return { issues: data || [], error, isLoading };
}

// 🔹 Hook para buscar comentários de uma issue específica
export function useIssueComments(
  owner: string,
  repoName: string,
  issueNumber: number,
) {
  const { data, error, isLoading } = useSWR(
    owner && repoName && issueNumber
      ? `${GITHUB_REPO_BASE_URL}/${owner}/${repoName}/issues/${issueNumber}/comments`
      : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  return { comments: data || [], error, isLoading };
}
