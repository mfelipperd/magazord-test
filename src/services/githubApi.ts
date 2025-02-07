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

  const {
    data: repositories,
    error: repoError,
    isLoading: repoLoading,
    mutate: refreshRepositories,
  } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}/repos` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const {
    data: starredRepositories,
    error: starredError,
    isLoading: starredLoading,
    mutate: refreshStarred,
  } = useSWR(
    username ? `${GITHUB_API_BASE_URL}/${username}/starred` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  // Atualiza os dados sempre que o username mudar
  useEffect(() => {
    if (manualFetchTrigger) {
      console.log("🔄 Atualizando dados manualmente...");
      refreshRepositories();
      refreshStarred();
      setManualFetchTrigger(false);
    }
  }, [manualFetchTrigger]);

  // Métodos para atualizar os repositórios manualmente
  const getRepositories = () => setManualFetchTrigger(true);
  const getStarredRepositories = () => setManualFetchTrigger(true);

  return {
    repositories: repositories || [],
    starredRepositories: starredRepositories || [],
    getRepositories,
    getStarredRepositories,
    loading: repoLoading || starredLoading,
    error: repoError || starredError,
    username,
    setUsername,
  };
}
