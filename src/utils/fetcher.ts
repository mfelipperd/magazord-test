import {
  githubMockRepositories,
  githubMockStarredRepositories,
  githubMockUser,
} from "../mocks/githubMocks";

export const fetcher = async (url: string) => {
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
