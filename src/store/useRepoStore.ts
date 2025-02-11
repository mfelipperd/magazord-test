/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Repo, IIssue } from "../interfaces/IRepository";

interface RepoStore {
  githubUser: any | null;
  originalRepositories: Repo[]; // 🔹 Nova propriedade para armazenar os repositórios originais
  repositories: Repo[];
  starredRepos: Repo[];
  languages: string[];
  repoTypes: string[];
  currentPage: number;
  repoDetails: Repo | null;
  issues: IIssue[];
  setGithubUser: (user: any) => void;
  setRepositories: (repos: Repo[]) => void;
  resetRepositories: () => void; // 🔹 Nova função para restaurar os repositórios originais
  setStarredRepositories: (repos: Repo[]) => void;
  setLanguages: (languages: string[]) => void;
  setRepoTypes: (types: string[]) => void;
  setCurrentPage: (page: number) => void;
  setRepoDetails: (repo: Repo | null) => void;
  setIssues: (issues: IIssue[]) => void;
  addStarredRepo: (repo: Repo) => void;
  removeStarredRepo: (repoId: number) => void;
}

export const useRepoStore = create<RepoStore>((set) => ({
  githubUser: null,
  originalRepositories: [], // 🔹 Armazena a lista original
  repositories: [],
  starredRepos: [],
  languages: [],
  repoTypes: [],
  currentPage: 1,
  repoDetails: null,
  issues: [],
  setGithubUser: (user) => set({ githubUser: user }),

  setRepositories: (repos) =>
    set((state) => ({
      repositories: repos,
      originalRepositories:
        state.originalRepositories.length > 0
          ? state.originalRepositories
          : repos, // 🔹 Apenas define os originais se ainda não estiverem definidos
    })),

  resetRepositories: () =>
    set((state) => ({
      repositories: state.originalRepositories, // 🔹 Restaura os originais
    })),

  setStarredRepositories: (repos) => set({ starredRepos: repos }),
  setLanguages: (languages) => set({ languages }),
  setRepoTypes: (types) => set({ repoTypes: types }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setRepoDetails: (repo) => set({ repoDetails: repo }),
  setIssues: (issues) => set({ issues }),

  addStarredRepo: (repo) =>
    set((state) => ({ starredRepos: [...state.starredRepos, repo] })),
  removeStarredRepo: (repoId) =>
    set((state) => ({
      starredRepos: state.starredRepos.filter((repo) => repo.id !== repoId),
    })),
}));

console.log(useRepoStore);
