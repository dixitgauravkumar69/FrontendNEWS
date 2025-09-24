import { useState } from "react";
import axios from "axios";

export default function UploadNews() {
  const [form, setForm] = useState({ title: "", description: "", image: null, video: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);

    if (form.image) data.append("image", form.image);
    if (form.video) data.append("video", form.video);

    try {
      const res = await axios.post(
        "https://backendnews-h3lh.onrender.com/news",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Upload response:", res.data);
      alert("News uploaded!");
      setForm({ title: "", description: "", image: null, video: null }); // reset form
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed! Check console for details.");
    }
  };

  return (
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
  );
}
