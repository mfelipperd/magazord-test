import { createBrowserRouter } from "react-router-dom";
import { AppRoute } from "../Enum/AppRoute";
import Layout from "../components/Layout";
import Home from "../Pages/Home/Home";
import RepositoryDetails from "../Pages/RepoDetails/RepoDetails";

export const router = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: AppRoute.REPO_DETAIL,
        element: <RepositoryDetails />,
      },
    ],
  },
]);
