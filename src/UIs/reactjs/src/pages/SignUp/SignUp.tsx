import React from "react";
import { useState } from "react";
import { register } from "../../services/authService";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(email, password, role);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Registration failed!");
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <h2>Sign Up</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignUp;
