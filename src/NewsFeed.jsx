// NewsFeed.js
import { useEffect, useState } from "react";
import "./NewsFeed.css";

export default function NewsFeed() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_584081a0f5dc3c52f0582e4f86640450be99d&q=breaking%20news&country=in&language=hi&category=top"
        );
        if (!res.ok) {
          throw new Error(`Error in fetching details`);
        }
        const data = await res.json();
        setDisplay(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="news-feed">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : display && Array.isArray(display) ? (
        <>
          <div className="breaking-news-banner">Breaking News</div>
          <div className="articles">
            {display.map((result, index) => (
              <div className="article" key={index} style={{ "--delay": index }}>
                {result.image_url && (
                  <img
                    src={result.image_url}
                    alt="Article"
                    className="article-image"
                  />
                )}
                <a
                  href={result.link}
                  className="article-title"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.title}
                </a>
                <p className="article-description">
                  {result.description || "Click to read more..."}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
