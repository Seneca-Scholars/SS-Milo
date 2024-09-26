import React, { useState } from 'react';
import axios from 'axios';

export function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (!name || !email || password.length < 8) {
        setErrorMessage('bruh');
        return;
      }

      const userData = {
        name,
        email,
        // password: await hashPw(password, 32) 
      };
  
      // POST 
      const response = await axios.post('http://localhost:3000/api/users/register', userData);
      
      setName('');
      setEmail('');
      setPassword('');
    
      console.log('Registration successful!', response.data);
    
    } catch (error) {
    
      console.error('Registration failed:', error.response.data);
  
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)} 
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label> 
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
/>
      <button type="submit">Register</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

// export default UserForm;
