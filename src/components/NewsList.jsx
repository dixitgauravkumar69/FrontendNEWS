import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import "./NewsList.css"; // 👈 Import CSS

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    axios.get("https://backendnews-h3lh.onrender.com/news").then(res => setNewsList(res.data));
  }, []);

  return (
    <div className="news-list">
      {newsList.map(news => <NewsCard key={news._id} news={news} />)}
    </div>
  );
}
