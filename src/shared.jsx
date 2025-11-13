import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const sectionStyle = { width: "min(1200px, 92%)", margin: "0 auto", padding: "80px 0" };

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 600,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  const handleNav = (hash) => {
    const go = () => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(go, 300);
    } else {
      go();
    }
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          ...sectionStyle,
          padding: "14px 0",
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            ...linkStyle,
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingInline: 0,
          }}
        >
          <img
            src="/logo.svg"
            alt="logo"
            style={{ width: 52, height: 52, imageRendering: "pixelated" }}
          />
          <span style={{ letterSpacing: 1, fontWeight: 800 }}>Maria Timbuș</span>
        </Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => handleNav("#projects")} style={linkStyle}>
            Projects
          </button>
          <button onClick={() => handleNav("#skills")} style={linkStyle}>
            Skills
          </button>
          <button onClick={() => handleNav("#about")} style={linkStyle}>
            About
          </button>
          <Link to="/press" style={linkStyle}>
            Press
          </Link>
          <a
            href="/Timbus Maria CV.pdf"
            download
            style={{
              ...linkStyle,
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: 999,
            }}
          >
            Resume ⬇
          </a>
          <button onClick={() => handleNav("#contact")} style={linkStyle}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "22px 0",
        textAlign: "center",
        opacity: 0.8,
      }}
    >
      <div style={{ width: "min(1200px,92%)", margin: "0 auto" }}>
        © {new Date().getFullYear()} Maria Timbuș — Monochrome Pixel Edition.
      </div>
    </footer>
  );
}
