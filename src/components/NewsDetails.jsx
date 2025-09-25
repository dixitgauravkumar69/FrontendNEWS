import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios.get(`https://backendnews-h3lh.onrender.com/news/${id}`)
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div>
      <h2>{news.title}</h2>
      <p>{news.description}</p>
      {news.image && <img src={news.image} alt={news.title} />}
      {news.video && <video controls src={news.video} />}
    </div>
  );
}
