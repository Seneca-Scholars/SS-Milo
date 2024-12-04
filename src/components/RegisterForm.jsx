import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, firstName, lastName }),
        });
  
   
      if (response.ok) { 
        const responseData = await response.json(); 
  
        if (responseData.success) { 
          
        } else {
          
          console.error('Registration failed:', responseData.message || 'xD');
          alert('xD.');
        }
      } else {
 
        console.error('Reg failed:', response.statusText);
        alert('try again later.');
      }
    } catch (error) {
      console.error('ERR registering:', error);
      alert(' please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name:</label> <input
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
      <button type="submit">Register</button>
    </form>
  );
}
export default RegisterForm; 