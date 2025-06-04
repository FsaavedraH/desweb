import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("currentUser", username);
    navigate("/");
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h2>ACCOUNT</h2>
      </header>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            required
          />
        </div>

        <div className="form-group">
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>

        <div className="login-actions">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
