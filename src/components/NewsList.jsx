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
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Copy Card function
  const shareNews = (item) => {
    const backendUrl = "https://backendnews-h3lh.onrender.com";
    const newsUrl = `${backendUrl}/api/news/share/${item._id}`;

    // Rich HTML card
    const htmlCard = `
      <div style="border:1px solid #ccc; padding:10px; width:300px; border-radius:8px; font-family: sans-serif;">
        <a href="${newsUrl}" target="_blank" style="text-decoration:none; color:black;">
          ${item.imageUrl ? `<img src="${backendUrl}${item.imageUrl}" style="width:100%; border-radius:6px;" />` : ""}
          <h4>${item.title}</h4>
          <p>${truncate(item.description, 100)}</p>
        </a>
      </div>
    `;

    navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([htmlCard], { type: "text/html" }),
        "text/plain": new Blob([newsUrl], { type: "text/plain" }),
      }),
    ])
      .then(() => alert("News card copied! Paste it in a supported editor."))
      .catch((err) => console.error(err));
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
          <Link to={`/news/${item._id}`}>Read More</Link>

          <button
            onClick={() => shareNews(item)}
            style={{ marginLeft: "10px" }}
          >
            Copy/Share Card
          </button>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
