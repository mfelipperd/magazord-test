import useSWR from "swr";
import { useState, useEffect } from "react";

const GITHUB_API_BASE_URL = "https://api.github.com/users";

const fetcher = async (url: string) => {
  console.log(`🔄 Fetching data from: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export function useGithubApi(initialUsername: string) {
  const [username, setUsername] = useState(initialUsername);
  const [manualFetchTrigger, setManualFetchTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de repositórios por página

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

  // Atualiza os dados sempre que o username mudar ou a página mudar
  useEffect(() => {
    if (manualFetchTrigger) {
      console.log("🔄 Atualizando dados manualmente...");
      refreshRepositories();
      refreshStarred();
      setManualFetchTrigger(false);
    }
  }, [manualFetchTrigger, currentPage]);

  // Métodos para atualizar os repositórios manualmente
  const getRepositories = () => setManualFetchTrigger(true);
  const getStarredRepositories = () => setManualFetchTrigger(true);

  // Métodos de Paginação
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

  return {
    repositories: repositories || [],
    starredRepositories: starredRepositories || [],
    getRepositories,
    getStarredRepositories,
    loading: repoLoading || starredLoading,
    error: repoError || starredError,
    username,
    setUsername,
    currentPage,
    nextPage,
    prevPage,
  };
}
