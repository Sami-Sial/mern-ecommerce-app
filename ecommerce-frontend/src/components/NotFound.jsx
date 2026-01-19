import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    },

    backgroundCircle1: {
      position: "absolute",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
      top: "-250px",
      right: "-250px",
      animation: "float 6s ease-in-out infinite",
    },

    backgroundCircle2: {
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.05)",
      bottom: "-150px",
      left: "-150px",
      animation: "float 8s ease-in-out infinite reverse",
    },

    card: {
      background: "white",
      borderRadius: "24px",
      padding: "3rem 2.5rem",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      maxWidth: "500px",
      width: "100%",
      position: "relative",
      zIndex: 1,
      animation: "slideUp 0.6s ease-out",
    },

    errorCode: {
      fontSize: "8rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      margin: "0",
      lineHeight: "1",
      animation: "bounce 2s ease-in-out infinite",
    },

    heading: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1a1a1a",
      margin: "1.5rem 0 0.75rem 0",
    },

    description: {
      fontSize: "1rem",
      color: "#666",
      lineHeight: "1.6",
      margin: "0 0 2rem 0",
    },

    button: {
      padding: "0.875rem 2rem",
      borderRadius: "12px",
      background: isHovered
        ? "linear-gradient(135deg, #764ba2 0%, #667eea 100%)"
        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      cursor: "pointer",
      color: "white",
      fontSize: "1rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: isHovered
        ? "0 8px 24px rgba(102, 126, 234, 0.4)"
        : "0 6px 20px rgba(102, 126, 234, 0.3)",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.3s ease",
    },

    iconWrapper: {
      fontSize: "4rem",
      margin: "0 0 1rem 0",
      animation: "shake 3s ease-in-out infinite",
    },
  };

  // Inject keyframe animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(5deg);
        }
      }
      
      @keyframes shake {
        0%, 100% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(-5deg);
        }
        75% {
          transform: rotate(5deg);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.backgroundCircle1}></div>
        <div style={styles.backgroundCircle2}></div>

        <div style={styles.card}>
          <div style={styles.iconWrapper}>🔍</div>
          <h1 style={styles.errorCode}>404</h1>
          <h2 style={styles.heading}>Page Not Found</h2>
          <p style={styles.description}>
            Oops! The page you're looking for seems to have wandered off.
            Don't worry, let's get you back on track.
          </p>
          <button
            style={styles.button}
            onClick={() => navigate("/")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;