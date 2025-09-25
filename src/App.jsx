import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UploadNews from "./components/UploadNews";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetails";

function App() {
  return (
    <div>
      <h1>News App</h1>
      <UploadNews />
      
      <Router>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
