import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch ('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ username, password }) 
      });
 
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const { token } = response.data;
      localStorage.setItem('token',token);
      navigate('/home');
    } catch (error) {
        console.error(' failed:', error);
        alert('invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          value={username} 

          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">pw:</label>

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form> 

  );
}

export default LoginForm;