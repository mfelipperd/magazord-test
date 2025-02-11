/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { useEffect } from "react";
import { useRepoStore } from "../store/useRepoStore"; // Zustand
import { useSearchStore } from "../store/useSearchStore";
import { fetcher } from "../utils/fetcher";

const GITHUB_API_BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL;

export function useGithubApi(username: string) {
  const {
    setGithubUser,
    setRepositories,
    setStarredRepositories,
    setLanguages,
    setRepoTypes,
    setCurrentPage,
    currentPage,
  } = useRepoStore();

  const { selectedLanguages, selectedRepoTypes } = useSearchStore();
  const itemsPerPage = 10;

  // Buscar usuário do GitHub
  const { data: githubUser, error: userError } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  // Buscar repositórios do usuário
  const { data: repositoriesData, error: repoError } = useSWR(
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

  // Buscar repositórios favoritos do usuário
  const { data: starredRepositoriesData, error: starredError } = useSWR(
    username
      ? `${GITHUB_API_BASE_URL}/${username}/starred?page=${currentPage}&per_page=${itemsPerPage}`
      : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  // Buscar linguagens utilizadas nos repositórios
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

  // Buscar tipos de repositórios
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

  // Atualizar Zustand quando os dados forem carregados
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

  // Funções para alterar estado global
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

/**
 * Hook para buscar detalhes de um repositório e suas issues.
 */
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
