import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch ('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ firstName, lastName, username, password, }) 
      });

   const data = await response.json();
      const token = data.token;
      localStorage.setItem('token',token);
      navigate('/dashboard'); 
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
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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