import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    onLogin(username);
  };

  return (
    <div className="login-main">
      <div className="login-container" data-state="closed">
        <h2>Login</h2>
        <div className="input-container">
          <label htmlFor="username" className="label">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="username-input" />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="label">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password-input" />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;