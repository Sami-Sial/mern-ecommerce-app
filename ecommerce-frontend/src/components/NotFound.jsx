import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2>Page Not Found</h2>
        <button
          style={{
            padding: "7px 15px",
            borderRadius: "10px",
            backgroundColor: "#131921",
            border: "none",
            cursor: "pointer",
            color: "white",
          }}
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </button>
      </div>
    </>
  );
};

export default NotFound;
