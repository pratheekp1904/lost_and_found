import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const DisplayPersonalItems = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleResolve = async (_id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${Base_URL}/item/${_id}`, { withCredentials: true });
      alert("Item has been successfully removed!");
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 💎 Glassmorphism Container Style
  const containerStyle = {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "20px",
    margin: "30px auto",
    borderRadius: "16px",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1e1e1e", // readable dark text
  };

  const headingStyle = {
    fontSize: "1.6rem",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    fontSize: "1rem",
    lineHeight: "1.6",
  };

  const imageContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  };

  const imageStyle = {
    borderRadius: "10px",
    maxWidth: "45%",
    height: "auto",
    objectFit: "cover",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#005fa3" : "#0074D9",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    alignSelf: "center",
    transition: "background 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🧾 {item.itemname}</h2>
      <p style={paragraphStyle}>📝 {item.itemdescription}</p>
      <p style={paragraphStyle}>
        📌 This item has been <strong>{item.concerntype}</strong>
      </p>

      {item.images?.length > 0 && (
        <div style={imageContainer}>
          {item.images.map((img, i) => (
            <img key={i} src={img} alt={`item-${i}`} style={imageStyle} />
          ))}
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <button
          style={buttonStyle}
          onClick={() => handleResolve(item._id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ✅ Mark as Resolved
        </button>
      )}
    </div>
  );
};

export default DisplayPersonalItems;
