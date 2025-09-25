import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./NewsDetails.css";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios
      .get(`https://backendnews-h3lh.onrender.com/news/${id}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div className="news-card">
      {news.image && (
        <div className="news-image">
          <img src={news.image} alt={news.title} />
        </div>
      )}
      <div className="news-content">
        <h2>{news.title}</h2>
        <p>{news.description}</p>
        {news.video && (
          <video controls className="news-video">
            <source src={news.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
