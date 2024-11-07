// NewsFeed.js

import { useEffect, useState } from "react";
//import "./styles.css";
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
        console.log(data.results);
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
      {/* Headline for breaking news */}
      <h2 className="breaking-news-headline">Breaking News</h2>

      {loading ? (
        <h3 className="loading">Loading...</h3>
      ) : error ? (
        <h3 className="error">{error}</h3>
      ) : display && Array.isArray(display) ? (
        <div className="articles">
          {display.map((result, index) => (
            <div className="article" key={index}>
              <img
                src={result.image_url}
                alt={result.title}
                className="article-image"
              />
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                <h3 className="article-title">{result.title}</h3>
              </a>
              <p className="article-description">{result.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
