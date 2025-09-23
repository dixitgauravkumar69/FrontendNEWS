import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios
      .get(`https://backendnews-h3lh.onrender.com/api/news/${id}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.error("Error fetching news:", err));
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div>
      <h2>{news.title}</h2>
      <p>{news.description}</p>
      {news.imageUrl && (
        <img
          src={`https://backendnews-h3lh.onrender.com${news.imageUrl}`}
          alt=""
          width="300"
        />
      )}
      {news.videoUrl && (
        <div>
          <iframe
            width="400"
            height="250"
            src={news.videoUrl}
            title="video"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default NewsDetail;
