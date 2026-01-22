import React from "react";
import shopLogo from "../../assets/shop.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand Section */}
        <div style={styles.brandSection}>
          <div style={styles.brandWrapper}>
            <img src={shopLogo} alt="ShopVerse Logo" style={styles.logo} />
            <h3 style={styles.brandName}>ShopVerse</h3>
          </div>
          <p style={styles.tagline}>Your universe of quality products</p>
        </div>

        {/* Site Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Site Links</h4>
          <div style={styles.links}>
            <a href="/" style={styles.link}>
              Homepage
            </a>
            <a href="/products" style={styles.link}>
              Products
            </a>
            <a href="/cart" style={styles.link}>
              Cart
            </a>
            <a href="/search" style={styles.link}>
              Search Products
            </a>
          </div>
        </div>

        {/* Developer Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Developer</h4>
          <div style={styles.links}>
            <a
              href="https://github.com/Sami-Sial"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={styles.icon}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sami-ullah-b536a8338"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={styles.icon}
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://sami-sial-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={styles.icon}
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
              </svg>
              Portfolio
            </a>
            <a
              href="https://sami-resume.tiiny.site"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={styles.icon}
              >
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        <p style={styles.copyrightText}>
          © {currentYear} ShopVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: "2.5rem 2rem 1.5rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr",
    gap: "3rem",
    alignItems: "start",
    marginBottom: "2rem",
  },
  brandSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  brandWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logo: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
  brandName: {
    fontSize: "1.75rem",
    fontWeight: "800",
    margin: "0",
    background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, sans-serif",
    letterSpacing: "0.5px",
  },
  tagline: {
    fontSize: "0.85rem",
    color: "#999999",
    margin: "0",
    paddingLeft: "0.25rem",
    fontStyle: "italic",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  heading: {
    fontSize: "0.85rem",
    fontWeight: "600",
    margin: "0",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  link: {
    color: "#cccccc",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  icon: {
    flexShrink: 0,
  },

  copyright: {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "1.5rem",
    textAlign: "center",
  },
  copyrightText: {
    fontSize: "0.8rem",
    color: "#999999",
    margin: "0",
  },
};

// Add Google Font and hover effects with responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
  
  footer a:hover {
    color: #ffffff !important;
    transform: translateX(3px);
  }
  
  /* Tablet */
  @media screen and (max-width: 900px) {
    footer > div:first-child {
      grid-template-columns: 1fr 1fr !important;
      gap: 2.5rem !important;
    }
    
    footer > div:first-child > div:first-child {
      grid-column: 1 / -1;
      text-align: center;
    }
    
    footer > div:first-child > div:first-child > div:first-child {
      justify-content: center;
    }
    
    footer > div:first-child > div:first-child > p {
      text-align: center;
      padding-left: 0 !important;
    }
  }
  
  /* Mobile */
  @media screen and (max-width: 600px) {
    footer {
      padding: 2rem 1.5rem 1.5rem !important;
    }
    
    footer > div:first-child {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }
    
    footer > div:first-child > div:first-child {
      text-align: center;
    }
    
    footer > div:first-child h3 {
      font-size: 1.5rem !important;
    }
    
    footer > div:first-child img {
      width: 35px !important;
      height: 35px !important;
    }
  }
  
  /* Small Mobile */
  @media screen and (max-width: 400px) {
    footer {
      padding: 1.5rem 1rem 1.5rem !important;
    }
    
    footer > div:first-child {
      gap: 1.5rem !important;
    }
    
    footer > div:first-child h3 {
      font-size: 1.3rem !important;
    }
    
    footer > div:first-child h4 {
      font-size: 0.8rem !important;
    }
    
    footer a {
      font-size: 0.85rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Footer;
