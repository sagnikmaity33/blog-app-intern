import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function loginUser(ev) {
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

    console.log("loginUser Called");

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        navigate("/"); 
      });
    } else {
      alert("Wrong Credentials!");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className={`form-control ${usernameError ? "is-invalid" : ""}`}
              placeholder="Enter username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
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
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
