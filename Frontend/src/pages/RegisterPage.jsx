import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();

    setUsernameError("");
    setPasswordError("");

    let hasError = false;

    if (username.length < 8) {
      setUsernameError("Username must be at least 8 characters long.");
      hasError = true;
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long.");
      hasError = true;
    }

    if (hasError) return; 

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-success mb-4">Register</h2>

        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className={`form-control ${usernameError ? "is-invalid" : ""}`}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameError && <div className="invalid-feedback">{usernameError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
