/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { useEffect } from "react";
import { useRepoStore } from "../store/useRepoStore";
import { fetcher } from "../utils/fetcher";

const GITHUB_API_BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export function useGithubApi() {
  const {
    setGithubUser,
    setRepositories,
    setStarredRepositories,
    setLanguages,
    setRepoTypes,
    setCurrentPage,
    currentPage,
    setTotalRepositories,
    userNameStore: username,
  } = useRepoStore();

  const itemsPerPage = 10;

  const { data: githubUser, error: userError } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const { data: repositoriesData, error: repoError } = useSWR(
    username
      ? `${GITHUB_API_BASE_URL}/${username}/repos?page=${currentPage}&per_page=${itemsPerPage}`
      : null,
    async (url) => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      });
      const repos = await response.json();

      if (response.headers.has("X-Total-Count")) {
        setTotalRepositories(Number(response.headers.get("X-Total-Count")));
      } else {
        setTotalRepositories(repos.length);
      }

      return repos;
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const { data: starredRepositoriesData, error: starredError } = useSWR(
    username
      ? `${GITHUB_API_BASE_URL}/${username}/starred?page=${currentPage}&per_page=${itemsPerPage}`
      : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const { data: languagesData } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}/repos?per_page=100` : null,
    async (url) => {
      const repos = await fetcher(url);
      return Array.from(
        new Set(repos.map((repo: any) => repo.language).filter(Boolean)),
      );
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const { data: repoTypesData } = useSWR(
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
    if (githubUser) setGithubUser(githubUser);
    if (repositoriesData) setRepositories(repositoriesData);
    if (starredRepositoriesData)
      setStarredRepositories(starredRepositoriesData);
    if (languagesData) setLanguages(languagesData as string[]);
    if (repoTypesData) setRepoTypes(repoTypesData);
  }, [
    githubUser,
    repositoriesData,
    starredRepositoriesData,
    languagesData,
    repoTypesData,
  ]);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return {
    githubUser,
    repositories: repositoriesData || [],
    starredRepositories: starredRepositoriesData || [],
    languages: languagesData || [],
    repoTypes: repoTypesData || [],
    loading: !repositoriesData || !starredRepositoriesData || !githubUser,
    error: userError || repoError || starredError,
    currentPage,
    nextPage,
    prevPage,
  };
}

export function useRepositoryData(owner: string, repoName: string) {
  const { setRepoDetails, setIssues, repoDetails, issues } = useRepoStore();

  const { data: repositoryData, error: repoError } = useSWR(
    owner && repoName
      ? `${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}`
      : null,
    fetcher,
  );

  const { data: issuesData, error: issuesError } = useSWR(
    owner && repoName
      ? `${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}/issues`
      : null,
    fetcher,
  );

  useEffect(() => {
    if (repositoryData) setRepoDetails(repositoryData);
    if (issuesData) setIssues(issuesData);
  }, [repositoryData, issuesData]);

  return {
    repoDetails,
    issues,
    error: repoError || issuesError,
    loading: !repositoryData || !issuesData,
  };
}
