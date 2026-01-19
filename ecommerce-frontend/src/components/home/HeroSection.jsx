import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 15,
        y: (e.clientY / window.innerHeight) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const styles = {
    hero: {
      position: "relative",
      height: "calc(100vh - 5rem)",
      width: "100%",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0f051a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
    },

    backgroundContainer: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
    },

    orb1: {
      position: "absolute",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)",
      top: "-10%",
      left: "-10%",
      filter: "blur(90px)",
      animation: "pulse 5s infinite",
      transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
      transition: "transform 0.35s ease-out",
    },

    orb2: {
      position: "absolute",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
      bottom: "-10%",
      right: "-10%",
      filter: "blur(90px)",
      animation: "pulse 5s infinite",
      animationDelay: "2.5s",
      transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
    },

    orb3: {
      position: "absolute",
      width: "600px",
      height: "600px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, transparent 70%)",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      filter: "blur(110px)",
      animation: "pulse 6s infinite",
      animationDelay: "1.2s",
    },

    gridPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
      opacity: 0.2,
    },

    contentWrapper: {
      position: "relative",
      zIndex: 10,
      maxWidth: "820px",
      width: "100%",
      padding: "30px 20px",
    },

    floatingBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 16px",
      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))",
      border: "1px solid rgba(168, 85, 247, 0.3)",
      borderRadius: "50px",
      backdropFilter: "blur(10px)",
      marginBottom: "24px",
      fontSize: "0.8rem",
    },

    badgeDot: {
      width: "7px",
      height: "7px",
      background: "#a855f7",
      borderRadius: "50%",
      animation: "pulse 2.2s infinite",
    },

    badgeText: {
      color: "#e9d5ff",
      fontSize: "0.78rem",
      fontWeight: "700",
      letterSpacing: "1.5px",
    },

    mainTitle: {
      fontSize: "clamp(2.4rem, 7vw, 3.8rem)",
      fontWeight: "900",
      lineHeight: "1.05",
      margin: "0 0 12px 0",
    },

    gradientTitle: {
      background: "linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)",
      backgroundSize: "200% 200%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: "gradientShift 8s ease infinite",
    },

    subtitle: {
      fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
      color: "#cbd5e1",
      lineHeight: "1.55",
      maxWidth: "620px",
      margin: "0 auto 32px auto",
    },

    statsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "32px",
      marginBottom: "36px",
    },

    statItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    statNumber: {
      fontSize: "1.65rem",
      fontWeight: "800",
      color: "white",
      marginBottom: "4px",
    },

    statLabel: {
      fontSize: "0.82rem",
      color: "#94a3b8",
    },

    ctaButtons: {
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      justifyContent: "center",
      marginBottom: "32px",
    },

    btnPrimary: {
      padding: "12px 28px",
      background: "linear-gradient(135deg, #a855f7, #ec4899)",
      border: "none",
      borderRadius: "50px",
      color: "white",
      fontSize: "0.95rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: "0 8px 32px rgba(168, 85, 247, 0.4)",
    },

    btnSecondary: {
      padding: "12px 28px",
      background: "transparent",
      border: "1.5px solid rgba(168, 85, 247, 0.45)",
      borderRadius: "50px",
      color: "#e0d0ff",
      fontSize: "0.95rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.25s ease",
    },

    trustBadges: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "24px",
      fontSize: "0.9rem",
      opacity: 0.85,
    },

    trustItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },

    checkIcon: {
      width: "18px",
      height: "18px",
      color: "#4ade80",
    },

    trustText: {
      fontSize: "0.88rem",
      color: "#cbd5e1",
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.backgroundContainer}>
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
        <div style={styles.orb3}></div>
        <div style={styles.gridPattern}></div>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.floatingBadge}>
          <span style={styles.badgeDot}></span>
          <span style={styles.badgeText}>WINTER SALE 2026</span>
        </div>

        <h1 style={styles.mainTitle}>
          Discover
          <span style={styles.gradientTitle}> Premium Style</span>
        </h1>

        <p style={styles.subtitle}>
          Curated collections of fashion, tech & exclusive drops. Limited quantities.
        </p>

        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>500K+</div>
            <div style={styles.statLabel}>Happy Customers</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>50K+</div>
            <div style={styles.statLabel}>Products</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>4.9★</div>
            <div style={styles.statLabel}>Rating</div>
          </div>
        </div>

        <div style={styles.ctaButtons}>
          <NavLink to={"/login"}
            style={styles.btnPrimary}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Shop Now →
          </NavLink>

          <NavLink to={"/products"}
            style={styles.btnSecondary}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(168, 85, 247, 0.1)";
              e.target.style.borderColor = "#a855f7";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(168, 85, 247, 0.45)";
            }}
          >
            View Collections
          </NavLink>
        </div>

        <div style={styles.trustBadges}>
          <div style={styles.trustItem}>
            <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span style={styles.trustText}>Free Shipping</span>
          </div>
          <div style={styles.trustItem}>
            <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span style={styles.trustText}>No Hidden Charges</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }

        @media (max-width: 640px) {
          .ctaButtons { flex-direction: column; gap: 14px; }
          button { width: 100%; max-width: 300px; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;