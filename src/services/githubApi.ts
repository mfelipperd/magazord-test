import useSWR from "swr";
import { useState, useEffect } from "react";
import {
  githubMockRepositories,
  githubMockStarredRepositories,
  githubMockUser,
} from "../mocks/githubMocks";
import { useSearchStore } from "../store/useSearchStore";

const GITHUB_API_BASE_URL = "https://api.github.com/users";

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch {
    console.warn("⚠️ API do GitHub caiu! Usando Mock.");
    if (url.includes("/starred")) return githubMockStarredRepositories;
    if (url.includes("/repos")) return githubMockRepositories;
    return githubMockUser;
  }
};

export function useGithubApi(initialUsername: string) {
  const [username, setUsername] = useState(initialUsername);
  const [manualFetchTrigger, setManualFetchTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { selectedLanguages, selectedRepoTypes } = useSearchStore();

  // 🔥 Dados do usuário
  const { data: githubUser, error: userError } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  // 🔥 Repositórios
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

  // 🔥 Starred Repositories
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

  // 🔥 Busca de Linguagens disponíveis (usado nos filtros)
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

  // 🔥 Busca de Tipos de Repositórios (exemplo: Forks, Mirrors, Arquivados)
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

  // 🔄 Atualiza ao mudar username ou página
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
