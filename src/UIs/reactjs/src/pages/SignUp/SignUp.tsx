import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { useAuth, } from '../../context/AuthContext';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(email, password, role);
      const { message, user, token } = response.data;

      console.log('Response:', response.data);
      console.log('User:', user);
      console.log('Token:', token);

      setMessage(message);
      if (user && token) {
        console.log('Logging in with:', user, token);
        login(user, token);
        navigate('/my-account');
      } else {
        setMessage('Registration failed: Unexpected response structure.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.join(', ');
        setMessage(`Registration failed: ${errorMessages}`);
      } else if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Registration failed: ${error.response.data.message}`);
      } else {
        setMessage('Registration failed: Unknown error');
      }
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
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignUp;
