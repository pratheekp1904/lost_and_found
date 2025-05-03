import React from "react";

const GroupInfo = () => {
  return (
    // <div style={containerStyle}>
    //   <h2 style={headingStyle}>Contributors</h2>
    //  <div style={containeritems}>
    //   <div style={infoStyle}>
    //     <p style={nameStyle}>Pratheek P</p>
    //     <p style={usnStyle}>USN: 1BG22CS105</p>
    //   </div>
    //   <div style={infoStyle}>
    //     <p style={nameStyle}>Nisarga A</p>
    //     <p style={usnStyle}>USN: 1BG22CS097</p>
    //   </div>
    //   <div style={infoStyle}>
    //     <p style={nameStyle}>Shivakumar M M</p>
    //     <p style={usnStyle}>USN: 1BG22CS147</p>
    //   </div>
    //   </div>
    //   </div>
    <div></div>
  );
};

  const containeritems = {
    display: "flex",
    justifyContent: "space-evenly"
  }

const containerStyle = {
  textAlign: "center",
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  fontSize: "2rem",
  color: "#0077B6",
  marginBottom: "1.5rem",
};

const infoStyle = {
  marginBottom: "1rem",
};

const nameStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#333",
};

const usnStyle = {
  fontSize: "1rem",
  color: "#555",
};

export default GroupInfo;
