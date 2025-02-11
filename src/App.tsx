import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Starred from "./Pages/Starred/Starred";
import Home from "./Pages/Home/Home";
import RepositoryDetails from "./Pages/RepoDetails/RepoDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starred" element={<Starred />} />
        <Route
          path="/repository/:owner/:repoName"
          element={<RepositoryDetails />}
        />
      </Routes>
    </Router>
  );
}
