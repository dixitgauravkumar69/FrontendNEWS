export default function NewsCard({ news }) {
  const shareUrl = `https://backendnews-h3lh.onrender.com/news/${news._id}/preview`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
  };

  const handleShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  return (
    <div className="card">
      {/* ✅ Show image if available */}
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          width="200"
          style={{ display: "block", marginBottom: "10px" }}
        />
      )}

      {/* ✅ Show video if available */}
      {news.video && (
        <video width="320" height="240" controls style={{ display: "block", marginBottom: "10px" }}>
          <source src={news.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <h3>{news.title}</h3>
      <p>{news.description.substring(0, 100)}...</p>

      {/* ✅ Buttons always visible */}
      <button onClick={handleShare}>Share on WhatsApp</button>
      <button onClick={handleCopy}>Copy Link</button>
    </div>
  );
}
