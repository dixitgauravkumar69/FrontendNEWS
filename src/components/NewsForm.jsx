import { useState } from "react";
import axios from "axios";

function NewsForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    formData.append("videoUrl", videoUrl);

    try {
      await axios.post(
        "https://backendnews-h3lh.onrender.com/api/news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("News added!");
    } catch (err) {
      console.error("Error adding news:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add News</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <br />
      <input
        type="text"
        placeholder="Video URL"
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewsForm;
