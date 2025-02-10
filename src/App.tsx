import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Starred from "./Pages/Starred/Starred";
import RepoDetails from "./Pages/RepoDetails/RepoDetails";
import Home from "./Pages/Home/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/repo/:repoName" element={<RepoDetails />} />
      </Routes>
    </Router>
  );
}
