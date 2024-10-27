import React, { useState } from "react";
import './popup.css';
import Signup from "./Signup";

export default function Popup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup,setShowPopup]=useState(true);
  const [showSignup,setShowSignup]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill out both fields");
      return;
    }
    try {
      const response = await fetch("https://backend-alpha-puce-22.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Login successful:", data);
        onClose()
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  function onClose(){
    setShowPopup(false);
  }

  function handleSignup(){
   setShowPopup(false)
   setShowSignup(true)
  }

  return (
    <div>
    {showPopup &&(
        <div>
    <div className="popup-overlay">
      <div className="login-box">
        <button className="close-btn" onClick={onClose}>&times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className="signup-btn" onClick={handleSignup}>
            New user? Signup here
          </div>
      </div>
    </div>
    </div>
)}
 {showSignup && (<Signup/>)}
</div>
  );
}
