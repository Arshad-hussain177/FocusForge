import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-layout">
          <div className="hero-content">
            <span className="hero-badge">Gamified Productivity Platform</span>
            <h1>Turn Productivity Into Rewards</h1>
            <p>
              FocusForge helps you stay productive by turning your daily tasks
              into points and your points into meaningful rewards. Build
              discipline, stay consistent, and motivate yourself every day.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">
                Get Started
              </Link>
              <Link to="/login" className="secondary-btn">
                Login
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-dashboard-card">
              <div className="hero-dashboard-header">
                <span className="hero-dot"></span>
                <span className="hero-dot"></span>
                <span className="hero-dot"></span>
                <p>FocusForge Dashboard</p>
              </div>

              <div className="hero-stats-row">
                <div className="hero-mini-stat">
                  <span>Total Points</span>
                  <strong>40</strong>
                </div>
                <div className="hero-mini-stat">
                  <span>Completed</span>
                  <strong>3</strong>
                </div>
                <div className="hero-mini-stat">
                  <span>Pending</span>
                  <strong>2</strong>
                </div>
              </div>

              <div className="hero-reward-box">
                <div>
                  <p className="hero-reward-label">Next Reward</p>
                  <h3>Pizza Reward</h3>
                  <span>You are only 10 points away</span>
                </div>
                <div className="hero-reward-icon">🎁</div>
              </div>

              <div className="hero-progress-info">
                <span>40 / 50 points</span>
                <span>80%</span>
              </div>

              <div className="hero-progress-bar">
                <div className="hero-progress-fill"></div>
              </div>

              <div className="hero-task-list">
                <div className="hero-task-item">
                  <span>Finish report</span>
                  <span className="hero-task-points">+20 pts</span>
                </div>
                <div className="hero-task-item">
                  <span>Exercise 30 mins</span>
                  <span className="hero-task-points">+15 pts</span>
                </div>
                <div className="hero-task-item">
                  <span>Read 20 pages</span>
                  <span className="hero-task-points">+10 pts</span>
                </div>
              </div>
            </div>

            <div className="hero-floating hero-floating-one">🏆</div>
            <div className="hero-floating hero-floating-two">⭐</div>
            <div className="hero-floating hero-floating-three">🔥</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>How FocusForge Works</h2>
          <p>A simple system to help you build habits and stay motivated.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Create Tasks</h3>
            <p>Add important daily tasks and organize what matters most.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">★</div>
            <h3>Earn Points</h3>
            <p>Complete tasks and collect points as a reward for consistency.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>Unlock Rewards</h3>
            <p>Redeem your points for rewards like pizza, breaks, and more.</p>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-header">
          <h2>Why People Will Love FocusForge</h2>
          <p>
            More than a to-do app, FocusForge helps you stay disciplined through
            visible progress and personal motivation.
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Build Better Habits</h3>
            <p>
              Turn small daily wins into a system that encourages consistency and
              self-discipline.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Stay Motivated</h3>
            <p>
              Rewards give you something meaningful to work toward instead of just
              checking off tasks.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Visualize Progress</h3>
            <p>
              See how close you are to unlocking your next reward and stay focused
              on what matters.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Make Productivity Fun</h3>
            <p>
              Gamified progress makes productivity less boring and more engaging
              for everyday use.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h2>Start Building Better Productivity Today</h2>
          <p>
            Create tasks, earn points, and unlock rewards that keep you moving
            forward every day.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Create Account
            </Link>
            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div>
            <h3>FocusForge</h3>
            <p>Build discipline. Earn rewards.</p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;