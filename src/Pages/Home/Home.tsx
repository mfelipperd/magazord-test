import UserProfile from "../../components/UserProfile";
import Tabs from "../../components/Tabs";
import RepoList from "../../components/RepoList";
import SearchBar from "../../components/SearchBar/SearchBar";

import { useHomeController } from "./home.controller";

export default function Home() {
  const {
    githubUser,
    extraInfo,
    repositories,
    starredRepos,
    totalRepositories,
    activeTab,
    setActiveTab,
  } = useHomeController();

  return (
    <div className="flex flex-col gap-10 lg:gap-[60px] md:gap-4 min-[733px]:flex-row w-full">
      <div className="min-[733px]:w-[217px]">
        <UserProfile
          avatarUrl={githubUser?.avatar_url || ""}
          name={githubUser?.name || githubUser?.login || "Usuário Desconhecido"}
          role={githubUser?.bio || "Sem descrição disponível"}
          company={githubUser?.company || "Sem empresa cadastrada"}
          extraInfo={extraInfo.filter(Boolean)}
        />
      </div>

      <div className="flex flex-col gap-4 lg:gap-10 md:gap-8 w-fit">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          repoCount={totalRepositories}
          starredCount={starredRepos.length}
        />
        <SearchBar />

        {activeTab === "repositories" ? (
          <RepoList starred={false} repositories={repositories} />
        ) : (
          <RepoList starred={true} repositories={starredRepos} />
        )}
      </div>
    </div>
  );
}
