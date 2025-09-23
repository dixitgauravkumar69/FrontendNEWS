import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function truncate(text, length) {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("https://backendnews-h3lh.onrender.com/api/news")
      .then((res) => setNews(res.data));
  }, []);

  // ✅ Updated Share Function (backend link with OG meta tags)
  const shareNews = (id) => {
    const url = `https://backendnews-h3lh.onrender.com/api/news/share/${id}`; // OG link serve karega
    navigator.clipboard.writeText(url);
    alert("Sharable link copied: " + url);
  };

  return (
    <div>
      <h2>All News</h2>
      {news.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.title}</h3>
          <p>{truncate(item.description, 100)}</p>

          {item.imageUrl && (
            <img
              src={`https://backendnews-h3lh.onrender.com${item.imageUrl}`}
              alt=""
              width="200"
              style={{ borderRadius: "6px" }}
            />
          )}

          {item.videoUrl && (
            <div>
              <iframe
                width="300"
                height="200"
                src={item.videoUrl}
                title="video"
              ></iframe>
            </div>
          )}

          <br />
          {/* React Detail Page */}
          <Link to={`/news/${item._id}`}>Read More</Link>

          {/* Copy/Share Button */}
          <button
            onClick={() => shareNews(item._id)}
            style={{ marginLeft: "10px" }}
          >
            Copy/Share
          </button>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
