import { create } from "zustand";
import { Repo } from "../interfaces/IRepository";

interface RepoStore {
  repositories: Repo[];
  starredRepos: Repo[];
  setRepositories: (repos: Repo[]) => void;
  addStarredRepo: (repo: Repo) => void;
  removeStarredRepo: (repoId: number) => void;
}

export const useRepoStore = create<RepoStore>((set) => ({
  repositories: [],
  starredRepos: [],
  setRepositories: (repos) => set({ repositories: repos }),
  addStarredRepo: (repo) =>
    set((state) => ({ starredRepos: [...state.starredRepos, repo] })),
  removeStarredRepo: (repoId) =>
    set((state) => ({
      starredRepos: state.starredRepos.filter((repo) => repo.id !== repoId),
    })),
}));
