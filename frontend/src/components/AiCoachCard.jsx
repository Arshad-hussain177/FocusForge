import React, { useEffect, useState } from "react";
import API from "../api/axios";

const AiCoachCard = () => {
  const [advice, setAdvice] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const res = await API.get("/ai/coach");
      setAdvice(res.data.advice);
      setSource(res.data.source);
    } catch (error) {
      setAdvice("Stay focused. Complete one important task now and keep building momentum.");
      setSource("fallback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="ai-coach-card">
      <div className="ai-coach-header">
        <div>
          <span className="ai-coach-badge">AI Coach</span>
          <h2>Your Productivity Insight</h2>
        </div>
        <button className="ai-refresh-btn" onClick={fetchAdvice}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="ai-coach-text">Generating advice...</p>
      ) : (
        <>
          <p className="ai-coach-text">{advice}</p>
          <span className="ai-coach-source">
            {source === "ai" ? "AI-generated insight" : "Smart fallback insight"}
          </span>
        </>
      )}
    </div>
  );
};

export default AiCoachCard;