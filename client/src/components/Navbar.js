// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { logout, selectUser } from "../utils/userSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = useSelector(selectUser);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   // const user = localStorage.getItem("authToken");

//   const handleToggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     // localStorage.removeItem("authToken");
//     dispatch(logout());
//     navigate("/home").then(() => {
//       // window.location.reload(true);
//       // alert("Successfully logged out");
//     });
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.matchMedia("(max-width: 1000px)").matches);
//     };

//     // Check screen size on mount
//     checkScreenSize();

//     // Add event listener for changes in screen size
//     window.addEventListener("resize", checkScreenSize);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//     };
//   }, []);

//   const navbarStyle = {
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#0077B6",
//     color: "white",
//     padding: "10px 20px",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//     height: "50px",
//     margin: "auto",
//   };

//   const linkContainerStyle = {
//     display: !isSmallScreen ? "flex" : "none",
//     justifyContent: "center",
//   };

//   const linkStyle = {
//     color: "white",
//     textDecoration: "none",
//     fontSize: "16px",
//     fontWeight: "bold",
//     margin: isSmallScreen ? "10px 0" : "10px 50px",
//     transition: "color 0.3s",
//     display: isSmallScreen ? "block" : "inline-block",
//   };

//   const iconStyle = {
//     cursor: "pointer",
//     display: isSmallScreen ? "block" : "none",
//     marginTop: "15px",
//   };

//   const menuStyle = {
//     display: isSmallScreen ? (menuOpen ? "flex" : "none") : "none", // Updated condition
//     flexDirection: "column",
//     alignItems: "center",
//     position: "absolute",
//     width: "90%",
//     margin: "auto",
//     top: "72px",
//     left: "0",
//     right: "0",
//     backgroundColor: "#0077B6",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//     zIndex: 1, // Ensure menu is on top
//     transition: "0.5s ease-in-out",
//   };

//   return (
//     <div style={navbarStyle}>
//       <div>
//         <div style={linkContainerStyle}>
//           <Link to="/home" style={linkStyle}>
//             Home
//           </Link>
//           {user && (
//             <>
//               <Link to="/my-items" style={linkStyle}>
//                 My Items
//               </Link>
//               <Link to="/all-items" style={linkStyle}>
//                 All Items
//               </Link>
//               <Link to="/all-items/lost" style={linkStyle}>
//                 Lost
//               </Link>
//               <Link to="/all-items/found" style={linkStyle}>
//                 Found
//               </Link>
//               <Link to="/raise-a-concern" style={linkStyle}>
//                 Raise a concern
//               </Link>
//               <Link to="/helpers" style={linkStyle}>
//                 Helpers
//               </Link>
//               <Link to="/claimants" style={linkStyle}>
//                 Claimers
//               </Link>
//               <Link to="/" style={linkStyle} onClick={handleLogout}>
//                 Logout
//               </Link>
//             </>
//           )}
//           {!user && (
//             <>
//               <Link to="/sign-up" style={linkStyle}>
//                 Sign Up
//               </Link>
//               <Link to="/sign-in" style={linkStyle}>
//                 Sign In
//               </Link>
//             </>
//           )}
//         </div>
//         <span style={iconStyle} onClick={handleToggleMenu}>
//           {menuOpen ? "✕" : "☰"}
//         </span>
//       </div>
//       <div style={menuStyle}>
//         <Link to="/home" style={linkStyle}>
//           Home
//         </Link>
//         {user && (
//           <>
//             <Link to="/my-items" style={linkStyle}>
//               My Items
//             </Link>
//             <Link to="/all-items" style={linkStyle}>
//               All Items
//             </Link>
//             <Link to="/all-items/lost" style={linkStyle}>
//               Lost
//             </Link>
//             <Link to="/all-items/found" style={linkStyle}>
//               Found
//             </Link>
//             <Link to="/raise-a-concern" style={linkStyle}>
//               Raise a concern
//             </Link>
//             <Link to="/helpers" style={linkStyle}>
//               Helpers
//             </Link>
//             <Link to="/claimants" style={linkStyle}>
//               Claimers
//             </Link>
//             <Link to="/" style={linkStyle} onClick={handleLogout}>
//               Logout
//             </Link>
//           </>
//         )}
//         {!user && (
//           <>
//             <Link to="/sign-up" style={linkStyle}>
//               Sign Up
//             </Link>
//             <Link to="/sign-in" style={linkStyle}>
//               Sign In
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 1000px)").matches);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  const isActive = (path) => location.pathname === path;

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f4ffff",
    color: "white",
    padding: "10px 20px",
    boxShadow: "0 0 10px hsla(293, 45.50%, 65.50%, 0.32)",
    height: "60px",
    position: "relative",
  };

  const linkContainerStyle = {
    display: !isSmallScreen ? "flex" : "none",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const linkStyle = (path) => ({
    backgroundColor: isActive(path) ? "blue" : "white",
    color: isActive(path) ? "white" : "black",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "8px 14px",
    margin: "0 6px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    display: "inline-block",
    border: "1px solid transparent",
    cursor: "pointer",
    boxShadow: isActive(path)
      ? "0 0 6px rgba(0, 180, 216, 0.6)"
      : "0 0 3px rgba(255, 255, 255, 0.2)",
  });

  const iconStyle = {
    cursor: "pointer",
    display: isSmallScreen ? "block" : "none",
    fontSize: "22px",
    color: "#fff",
  };

  const menuStyle = {
    display: isSmallScreen ? (menuOpen ? "flex" : "none") : "none",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    top: "60px",
    left: "0",
    backgroundColor: "#0077B6",
    zIndex: 100,
    padding: "10px 0",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  };

  const links = [
    { path: "/home", label: "Home" },
    { path: "/my-items", label: "My Items", auth: true },
    { path: "/all-items", label: "All Items", auth: true },
    { path: "/all-items/lost", label: "Lost", auth: true },
    { path: "/all-items/found", label: "Found", auth: true },
    { path: "/raise-a-concern", label: "Raise Concern", auth: true },
    { path: "/helpers", label: "Helpers", auth: true },
    { path: "/claimants", label: "Claimants", auth: true },
    { path: "/sign-up", label: "Sign Up", auth: false },
    { path: "/sign-in", label: "Sign In", auth: false },
  ];

  return (
    <div style={navbarStyle}>
      <div style={linkContainerStyle}>
        {links
          .filter((link) => user ? link.auth !== false : link.auth !== true)
          .map((link) => (
            <Link key={link.path} to={link.path} style={linkStyle(link.path)}>
              {link.label}
            </Link>
          ))}
        {user && (
          <Link to="/" style={linkStyle("/")} onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>

      <span style={iconStyle} onClick={handleToggleMenu}>
        {menuOpen ? "✕" : "☰"}
      </span>

      <div style={menuStyle}>
        {links
          .filter((link) => user ? link.auth !== false : link.auth !== true)
          .map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={linkStyle(link.path)}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        {user && (
          <Link
            to="/"
            style={linkStyle("/")}
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
