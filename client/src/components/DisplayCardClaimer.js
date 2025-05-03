import React from "react";

const DisplayCardClaimer = ({ claimant, number }) => {
  const {
    itemdetails,
    claimantname,
    mobilenumber,
    hostelname,
    proofofclaim,
    date,
  } = claimant;

  const cardStyle = {
    background: "linear-gradient(135deg, #f0f9ff, #e0f7ff)",
    padding: "25px 30px",
    margin: "20px auto",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    fontFamily: "'Segoe UI', sans-serif",
    transition: "transform 0.2s ease-in-out",
  };

  const titleStyle = {
    fontSize: "22px",
    color: "#1a73e8",
    marginBottom: "10px",
  };

  const numberStyle = {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#333",
  };

  const valueStyle = {
    marginBottom: "10px",
    fontSize: "15px",
    color: "#444",
  };

  const tagStyle = {
    display: "inline-block",
    backgroundColor: "#d0e7ff",
    color: "#1a1a1a",
    borderRadius: "20px",
    padding: "6px 12px",
    fontSize: "13px",
    marginTop: "5px",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Claimant Details</h2>
      <p style={numberStyle}>Record No. <strong>{number}</strong></p>
      <p style={valueStyle}>
        <span style={labelStyle}>Claimant Name:</span> {claimantname}
      </p>
      <p style={valueStyle}>
        <span style={labelStyle}>Item Claimed:</span> <span style={tagStyle}>{itemdetails}</span>
      </p>
      <p style={valueStyle}>
        <span style={labelStyle}>Mobile Number:</span> {mobilenumber}
      </p>
      <p style={valueStyle}>
        <span style={labelStyle}>Hostel Name:</span> {hostelname}
      </p>
      <p style={valueStyle}>
        <span style={labelStyle}>Proof of Claim:</span> <span style={tagStyle}>{proofofclaim}</span>
      </p>
      <p style={valueStyle}>
        <span style={labelStyle}>Date:</span> {new Date(date).toLocaleString()}
      </p>
    </div>
  );
};

export default DisplayCardClaimer;
