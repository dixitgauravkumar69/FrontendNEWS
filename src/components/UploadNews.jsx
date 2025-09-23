import { useState } from "react";
import axios from "axios";

export default function UploadNews() {
  const [form, setForm] = useState({ title: "", description: "", image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("image", form.image);

    await axios.post("https://backendnews-h3lh.onrender.com/news", data);
    alert("News uploaded!");
    setForm({ title: "", description: "", image: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" required
        onChange={e => setForm({ ...form, title: e.target.value })} value={form.title} />
      <textarea placeholder="Description" required
        onChange={e => setForm({ ...form, description: e.target.value })} value={form.description}></textarea>
      <input type="file" accept="image/*" required
        onChange={e => setForm({ ...form, image: e.target.files[0] })} />
      <button type="submit">Upload News</button>
    </form>
  );
}
