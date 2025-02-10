export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  topics?: string[];
  license?: {
    name: string;
    url?: string;
  };
  homepage?: string;
  created_at: string;
  updated_at: string;
}
