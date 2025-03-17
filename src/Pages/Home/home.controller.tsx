import { useUpdateURLParams } from "../../hooks/updateUrlParameters";
import { useGetURLParameters } from "../../hooks/getUrlParameters";
import { useRepoStore } from "../../store/useRepoStore";
import { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { cilLocationPin } from "@coreui/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
//teste vercel
export const useHomeController = () => {
  const { githubUser, repositories, starredRepos, totalRepositories } =
    useRepoStore();

  const { tab } = useGetURLParameters();
  const [activeTab, setActiveTab] = useState<"repositories" | "starred">(
    tab as "repositories" | "starred",
  );
  const updateUrl = useUpdateURLParams();

  const extraInfo = [
    {
      infoName: githubUser?.company || "",
      infoIcon: (
        <Icon
          icon="carbon:enterprise"
          className="h-4 w-4 text-custom-blue-100"
        />
      ),
    },
    {
      infoName: githubUser?.location || "",
      infoIcon: (
        <CIcon icon={cilLocationPin} className="h-4 w-4 text-custom-blue-100" />
      ),
    },
    {
      infoName: githubUser?.blog || "",
      infoIcon: (
        <Icon
          width={4}
          height={4}
          icon="system-uicons:chain"
          className="h-4 w-4 text-custom-blue-100"
        />
      ),
    },
    {
      infoName: githubUser?.twitter_username || "",
      infoIcon: (
        <Icon
          icon="hugeicons:twitter"
          className="h-4 w-4 text-custom-blue-100"
        />
      ),
    },
  ];

  useEffect(() => {
    if (!tab) {
      setActiveTab("repositories");
    }
    if (tab) {
      updateUrl({ tab: activeTab });
    }
  }, [activeTab]);

  return {
    githubUser,
    extraInfo,
    repositories,
    starredRepos,
    totalRepositories,
    activeTab,
    setActiveTab,
  };
};
