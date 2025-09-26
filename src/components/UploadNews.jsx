import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import "./UploadNews.css"; // 👈 import CSS file

export default function UploadNews() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    video: null,
  });
  const [newsList, setNewsList] = useState([]);

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

    if (form.video) {
      const videoData = new FormData();
      videoData.append("file", form.video);
      videoData.append("upload_preset", "Gaurav_Preset");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dpheznvvs/video/upload",
          videoData
        );
        videoUrl = res.data.secure_url;
      } catch (err) {
        console.error("Video upload failed:", err);
        alert("Video upload failed! Check console.");
        return;
      }
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);
    if (videoUrl) data.append("video", videoUrl);

    try {
      await axios.post("https://backendnews-h3lh.onrender.com/news", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("News uploaded successfully!");
      setForm({ title: "", description: "", image: null, video: null });
      fetchNews();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed! Check console.");
    }
  };

  return (
    <div className="upload-container">
      {/* Upload Form */}
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2>Upload News</h2>

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

     
    </div>
  );
}
