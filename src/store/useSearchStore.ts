import { create } from "zustand";

interface SearchStore {
  searchValue: string;
  selectedLanguages: string[];
  selectedRepoTypes: string[];
  setSearchValue: (value: string) => void;
  setSelectedLanguages: (languages: string[]) => void;
  setSelectedRepoTypes: (types: string[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchValue: "",
  selectedLanguages: [],
  selectedRepoTypes: [],
  setSearchValue: (value) => set({ searchValue: value }),
  setSelectedLanguages: (languages) => set({ selectedLanguages: languages }),
  setSelectedRepoTypes: (types) => set({ selectedRepoTypes: types }),
}));
