import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = "https://backendnews-h3lh.onrender.com";

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/news/`)
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="news-list">
      {news.map(n => (
        <div key={n._id} className="news-card">
          <img
            src={n.imageUrl || `${backendUrl}/default-image.png`}
            alt={n.title}
            width={300}
          />
          <h3>{n.title}</h3>
          <p>{n.description.substring(0, 100)}...</p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${n.title} - ${backendUrl}/api/news/share/${n._id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on WhatsApp
          </a>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
