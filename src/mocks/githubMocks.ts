export const githubMockUser = {
  login: "mockuser",
  id: 123456,
  avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
  name: "Mock User",
  company: "Mock Company",
  blog: "https://mocksite.com",
  location: "São Paulo, Brasil",
  bio: "Desenvolvedor Full Stack apaixonado por código!",
  twitter_username: "mockdev",
  public_repos: 42,
  public_gists: 10,
  followers: 500,
  following: 100,
};

export const githubMockRepositories = [
  {
    id: 1,
    name: "MockRepo1",
    full_name: "mockuser/MockRepo1",
    html_url: "https://github.com/mockuser/MockRepo1",
    description: "Este é um repositório de teste",
    language: "JavaScript",
    stargazers_count: 120,
    forks_count: 30,
    owner: {
      login: "mockuser",
      avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
    },
  },
  {
    id: 2,
    name: "MockRepo2",
    full_name: "mockuser/MockRepo2",
    html_url: "https://github.com/mockuser/MockRepo2",
    description: "Outro repositório de exemplo",
    language: "TypeScript",
    stargazers_count: 200,
    forks_count: 50,
    owner: {
      login: "mockuser",
      avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
    },
  },
];

export const githubMockStarredRepositories = [
  {
    id: 3,
    name: "StarredMockRepo",
    full_name: "mockuser/StarredMockRepo",
    html_url: "https://github.com/mockuser/StarredMockRepo",
    description: "Este é um repositório favoritado",
    language: "Python",
    stargazers_count: 350,
    forks_count: 80,
    owner: {
      login: "mockuser",
      avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
    },
  },
];
