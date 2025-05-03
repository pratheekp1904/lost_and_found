// import React, { useState } from "react";
// import axios from "axios";
// import config from "./config";

// const Base_URL = config.baseURL;

// const LostItems = (props) => {
//   const { item } = props;

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [userName, setUserName] = useState("");
//   const [userMobile, setUserMobile] = useState("");
//   const [userHostel, setUserHostel] = useState("");
//   const [proofOfClaim, setProofOfClaim] = useState("");

//   const boxStyle = {
//     border: "1px solid #ccc",
//     padding: "10px",
//     borderRadius: "5px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     margin: "10px",
//     display: "flex",
//     flexDirection: "column",
//   };

//   const btnStyle = {
//     backgroundColor: "#0074D9",
//     color: "white",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   };

//   const btnStyleSubmit = {
//     backgroundColor: "green",
//     color: "white",
//     padding: "8px 15px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   };

//   const inputStyle = {
//     width: "90%",
//     height: "15px",
//     marginBottom: "5px",
//   };

//   const imageStyle = {
//     width: "100%",
//     maxHeight: "500px",
//     margin: "5px",
//   };

//   const largerScreenMediaQuery = window.matchMedia("(min-width: 768px)");

//   if (largerScreenMediaQuery.matches) {
//     imageStyle.maxWidth = "40%";
//   } else {
//     imageStyle.maxWidth = "100%";
//   }

//   const closeButtonStyle = {
//     cursor: "pointer",
//   };

//   const handleHelp = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = async () => {
//     setIsModalOpen(false);
//   };

//   const handleSubmitHelp = async (_id) => {
//     const data = {
//       helpername: userName,
//       mobilenumber: userMobile,
//       hostelname: userHostel,
//       itemdetails: `${item.itemname} - ${item.itemdescription}`,
//     };

//     await axios.post(`${Base_URL}/helper`, data);
//     alert(
//       "Thank you for contributing to the growth of our community. We are temporarily taking this item off the portal, with the hope that your assistance may aid in returning it to its original owner."
//     );
//     await axios.delete(`${Base_URL}/helper/${_id}`);
//     closeModal();
//     alert("Item has been successfully removed!");
//   };

//   if (item.concerntype !== "lost") {
//     return null;
//   }

//   return (
//     <div style={boxStyle}>
//       <div>
//         <h2>Name: {item.itemname}</h2>
//         <p>Description: {item.itemdescription}</p>
//         <p>
//           This item has been <b>{item.concerntype}</b>
//         </p>
//         {item.images && item.images.length > 0 && (
//           <div>
//             <p>Images:</p>
//             {item.images.map((image, index) => (
//               <img key={index} src={image} alt="png" style={imageStyle} />
//             ))}
//           </div>
//         )}
//       </div>
//       <button onClick={handleHelp} style={btnStyle}>
//         Help
//       </button>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span
//               className="close"
//               style={closeButtonStyle}
//               onClick={closeModal}
//             >
//               &times;
//             </span>
//             <h3>Enter Your Information</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               style={inputStyle}
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               style={inputStyle}
//               value={userMobile}
//               onChange={(e) => setUserMobile(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Hostel Name"
//               style={inputStyle}
//               value={userHostel}
//               onChange={(e) => setUserHostel(e.target.value)}
//             />
//             {item.concerntype === "found" && (
//               <input
//                 type="text"
//                 placeholder="Proof of Claim"
//                 style={inputStyle}
//                 value={proofOfClaim}
//                 onChange={(e) => setProofOfClaim(e.target.value)}
//               />
//             )}
//             <button onClick={handleSubmitHelp(item._id)} style={btnStyleSubmit}>
//               Submit Help
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LostItems;

import React, { useState } from "react";
import axios from "axios";
import config from "./config";

const Base_URL = config.baseURL;

const LostItems = (props) => {
  const { item } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userHostel, setUserHostel] = useState("");
  const [proofOfClaim, setProofOfClaim] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 💎 Glassmorphism Styles
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
    color: "#1e1e1e",
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
    backgroundColor: "#0074D9",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    alignSelf: "center",
    transition: "background 0.3s ease",
    border: "none",
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
  };

  const closeButtonStyle = {
    cursor: "pointer",
    fontSize: "20px",
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#333",
  };

  const handleHelp = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitHelp = async (_id) => {
    setIsLoading(true);
    const data = {
      helpername: userName,
      mobilenumber: userMobile,
      hostelname: userHostel,
      itemdetails: `${item.itemname} - ${item.itemdescription}`,
    };

    try {
      await axios.post(`${Base_URL}/helper`, data);
      alert(
        "Thank you for helping to bring the item back! It will be temporarily removed from the portal."
      );
      await axios.delete(`${Base_URL}/helper/${_id}`);
      closeModal();
    } catch (error) {
      console.error("Error submitting help:", error);
      alert("There was an error submitting your help. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (item.concerntype !== "lost") {
    return null;
  }

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

      <button style={buttonStyle} onClick={handleHelp}>
        I Can Help
      </button>

      {isModalOpen && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <span
              className="close"
              style={closeButtonStyle}
              onClick={closeModal}
            >
              &times;
            </span>
            <h3>Enter Your Information</h3>
            <input
              type="text"
              placeholder="Name"
              style={inputStyle}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              style={inputStyle}
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hostel Name"
              style={inputStyle}
              value={userHostel}
              onChange={(e) => setUserHostel(e.target.value)}
            />
            {item.concerntype === "found" && (
              <input
                type="text"
                placeholder="Proof of Claim"
                style={inputStyle}
                value={proofOfClaim}
                onChange={(e) => setProofOfClaim(e.target.value)}
              />
            )}
            <button
              onClick={() => handleSubmitHelp(item._id)}
              style={buttonStyle}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Help"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Styles
const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  width: "400px",
  position: "relative",
  textAlign: "center",
};

export default LostItems;
