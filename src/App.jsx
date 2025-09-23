import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NewsForm from "./components/NewsForm";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav>
          <Link to="/">All News</Link> | <Link to="/add">Add News</Link>
        </nav>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/add" element={<NewsForm />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
