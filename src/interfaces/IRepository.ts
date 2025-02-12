export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  mirror_url: string | null;
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

import { Key } from "react";

export interface IIssue {
  id: Key | null | undefined;
  html_url: string;
  title: string;
  user: {
    login: string;
  };
}
