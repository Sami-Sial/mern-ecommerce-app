import React, { useEffect } from "react";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const SessionLoader = () => {
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      @keyframes sessionSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div style={styles.wrapper}>
            <div style={styles.iconWrapper}>
                <HourglassEmptyIcon style={styles.icon} />
            </div>
            <p style={styles.text}>Preparing session for you...</p>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px",
        backgroundColor: "#f9fafb",
    },

    iconWrapper: {
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "sessionSpin 1.2s linear infinite",
    },

    icon: {
        fontSize: "28px",
        color: "#ffffff",
    },

    text: {
        fontSize: "1rem",
        fontWeight: 500,
        color: "#6b7280",
        letterSpacing: "0.3px",
    },
};

export default SessionLoader;
