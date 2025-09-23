import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UploadNews from "./components/UploadNews";
import NewsList from "./components/NewsList";

function App() {
  return (
    <div>
      <h1>News App</h1>
      <UploadNews />
      <hr />
      <NewsList />
    </div>
  );
}

export default App;
