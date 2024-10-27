import React, { useState } from "react";
import './popup.css';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [showPopup,setShowPopup]=useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password=password1;
    if (!username || !password1 || !password2) {
      setError("Please fill out all fields");
      return;
    }
    if(password1!==password2){
        setError("Passwords do not match");
        return;
    }
    try {
      const response = await fetch("https://backend-alpha-puce-22.vercel.app/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

    if(response.ok){
        console.log("New user Created",data)
        onClose()
    }
else{
    setError(data.message)
    console.error("Error:",data.message)
}
    }
      catch (error) {
        setError("An error occurred. Please try again.");
        console.error("Error:", error);
      }
    }

  function onClose(){
    setShowPopup(!showPopup);
  }

  return (
    <div>
    {showPopup &&(
        <div>
    <div className="popup-overlay">
      <div className="login-box">
        <button className="close-btn" onClick={onClose}>&times;
        </button>
        <h2>Signup</h2>
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
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
    </div>
)}
</div>
  );
}
