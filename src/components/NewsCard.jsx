export default function NewsCard({ news }) {
  const shareUrl = `https://backendnews-h3lh.onrender.com/news/${news._id}/preview`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
  };

  const handleShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <div className="card">
      <img src={news.image} alt={news.title} width="200"/>
      <h3>{news.title}</h3>
      <p>{news.description.substring(0, 100)}...</p>
      <button onClick={handleShare}>Share on WhatsApp</button>
      <button onClick={handleCopy}>Copy Link</button>
    </div>
  );
}
