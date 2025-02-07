import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Starred from "./Pages/Starred/Starred";
import RepoDetails from "./Pages/RepoDetails/RepoDetails";
import Home from "./Pages/Home/Home";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/" className="font-bold">
          Home
        </Link>
        <Link to="/starred">Favoritos</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/repo/:repoName" element={<RepoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
