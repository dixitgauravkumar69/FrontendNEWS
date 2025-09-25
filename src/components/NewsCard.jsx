import "./NewsCard.css"; // 👈 CSS import

export default function NewsCard({ news }) {
  const shareUrl = `https://backendnews-h3lh.onrender.com/news/${news._id}`;

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
    <div className="news-card">
      {news.image && <img className="news-image" src={news.image} alt={news.title} />}
      {news.video && (
        <video className="news-video" controls>
          <source src={news.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <h3 className="news-title">{news.title}</h3>
      <p className="news-description">{news.description.substring(0, 100)}...</p>
      <div className="news-buttons">
        <button className="btn whatsapp-btn" onClick={handleShare}>
          Share on WhatsApp
        </button>
        <button className="btn copy-btn" onClick={handleCopy}>
          Copy Link
        </button>
      </div>
    </div>
  );
}
