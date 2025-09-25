import { useState, useEffect } from "react";
import axios from "axios";

export default function UploadNews() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    video: null,
  });
  const [newsList, setNewsList] = useState([]);

  // ✅ Fetch all news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("https://backendnews-h3lh.onrender.com/news");
      setNewsList(res.data);
    } catch (err) {
      console.error("Fetching news failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let videoUrl = "";

    // 1️⃣ Upload video directly to Cloudinary (if selected)
    if (form.video) {
      const videoData = new FormData();
      videoData.append("file", form.video);
      videoData.append("upload_preset", "Gaurav_Preset"); // ← your preset

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dpheznvvs/video/upload", // ← your cloud name
          videoData
        );
        videoUrl = res.data.secure_url;
      } catch (err) {
        console.error("Video upload failed:", err);
        alert("Video upload failed! Check console.");
        return;
      }
    }

    // 2️⃣ Upload title, description, image, and video URL to backend
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);
    if (videoUrl) data.append("video", videoUrl);

    try {
      const res = await axios.post(
        "https://backendnews-h3lh.onrender.com/news",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Upload response:", res.data);
      alert("News uploaded successfully!");
      setForm({ title: "", description: "", image: null, video: null });

      // Refresh news list
      fetchNews();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed! Check console.");
    }
  };

  return (
    <div>
      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          value={form.title}
        />

        <textarea
          placeholder="Description"
          required
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          value={form.description}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setForm({ ...form, video: e.target.files[0] })}
        />

        <button type="submit">Upload News</button>
      </form>

      <hr />

      {/* Show uploaded news list */}
      <div>
        <h2>All News</h2>
        {newsList.length === 0 ? (
          <p>No news uploaded yet.</p>
        ) : (
          newsList.map((news, idx) => (
            <div key={idx} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              {news.image && (
                <img
                  src={news.image}
                  alt="news"
                  style={{ width: "200px", display: "block", marginBottom: "10px" }}
                />
              )}
              {news.video && (
                <video width="320" height="240" controls>
                  <source src={news.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
