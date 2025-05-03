import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GroupInfo from "./GroupInfo";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";

const Base_URL = config.baseURL;

const HomePage = () => {
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return;

        const decodedToken = jwtDecode(authToken);
        const userId = decodedToken.sub;

        const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        setUserDetails(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // --- Styling ---
  const container = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to right, #83a4d4, #b6fbff)",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  };

  const card = {
    background: "white",
    padding: "3rem",
    borderRadius: "20px",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    marginTop: "2rem",
  };

  const heading = {
    fontSize: "2.5rem",
    color: "#0074D9",
    marginBottom: "1.5rem",
  };

  const paragraph = {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    lineHeight: "1.5",
    color: "#333",
  };

  const button = {
    backgroundColor: "#0074D9",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "30px",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    backgroundColor: "#005fa3",
  };

  const userInfoCard = {
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
    marginTop: "2rem",
    textAlign: "left",
  };

  const userField = {
    fontSize: "1rem",
    marginBottom: "0.75rem",
    color: "#555",
  };

  const label = {
    fontWeight: "bold",
    color: "#0077B6",
  };

  return (
    <>
      <Navbar />
      <div style={container}>
        <div style={card}>
          <h1 style={heading}>Lost & Found Tracking System</h1>

          {!user || !userDetails ? (
            <>
              <p style={paragraph}>
                Please sign in to track or raise a concern.
              </p>
              <Link to="/sign-in">
                <button
                  style={{ ...button, ...(hovered ? buttonHover : {}) }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Sign In
                </button>
              </Link>
            </>
          ) : (
            <>
              <p style={paragraph}>
                Welcome{" "}
                <b>
                  {userDetails.data.gotUser.username} (
                  {userDetails.data.gotUser.rollno})
                </b>
                , ready to report or find your item?
              </p>
              <Link to="/raise-a-concern">
                <button
                  style={{ ...button, ...(hovered ? buttonHover : {}) }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Raise Concern
                </button>
              </Link>

              {/* 👤 User Info Card */}
              <div style={userInfoCard}>
                <p style={userField}>
                  <span style={label}>Name:</span>{" "}
                  {userDetails.data.gotUser.username}
                </p>
                <p style={userField}>
                  <span style={label}>Roll Number:</span>{" "}
                  {userDetails.data.gotUser.rollno}
                </p>
                <p style={userField}>
                  <span style={label}>Email:</span>{" "}
                  {userDetails.data.gotUser.email}
                </p>
                <p style={userField}>
                  <span style={label}>Joined On:</span>{" "}
                  {new Date(
                    userDetails.data.gotUser.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: "5rem", width: "100%", maxWidth: "800px" }}>
          <GroupInfo />
        </div>
      </div>
    </>
  );
};

export default HomePage;
