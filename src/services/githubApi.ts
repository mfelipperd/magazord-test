import useSWR from "swr";
import { useState, useEffect } from "react";
import {
  githubMockRepositories,
  githubMockStarredRepositories,
  githubMockUser,
} from "../mocks/githubMocks";

const GITHUB_API_BASE_URL = "https://api.github.com/users";

const fetcher = async (url: string) => {
  console.log(`🔄 Fetching data from: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
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
      ? `${GITHUB_API_BASE_URL}/${username}/repos?page=${currentPage}&per_page=${itemsPerPage}`
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
    getRepositories,
    getStarredRepositories,
    loading: repoLoading || starredLoading,
    error: userError || repoError || starredError,
    username,
    setUsername,
    currentPage,
    nextPage,
    prevPage,
  };
}
