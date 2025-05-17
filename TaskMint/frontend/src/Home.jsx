import React from "react";
import "./App.css";

const Home = () => (
  <div className="home-hero-bg">
    <img src="/images/admin.jpg" alt="Journalist's Workplace" className="home-hero-img-full" />
    <div className="home-hero-overlay">
      <div className="home-hero-content-centered">
        <h1 className="home-hero-title">
          Empower  <span className="home-hero-highlight" >Your Workflow</span>
        </h1>
        <p className="home-hero-desc" style={{ color: "white" }}>
          Upload. Assign. Track.<br />
          The simplest way to manage agents and distribute tasks efficiently.
        </p>
      </div>
    </div>
  </div>
);

export default Home;
