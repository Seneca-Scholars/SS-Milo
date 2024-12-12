import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, username, password }),
        });
  
      
      
        if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        localStorage.setItem('token', responseData.token);
        console.log(responseData.token);
        setIsLoggedIn(true); 
      } else {
        console.error('reg failed:', await response.text());
        alert('reg failed. try again later.');
      }
    } catch (error) {
      console.log('poop');
    }
  }; 

  useEffect(() => { 
    console.log('isLoggedIn:', isLoggedIn); 
    if (isLoggedIn){
      navigate('/dashboard'); 
     }
  }, [isLoggedIn]
  
); 


// if (isLoggedIn){
//   return(
//     <Navigate to={ "/dashboard"} />
//   );
// }



  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Register </button>
    </form>
  );
}
export default RegisterForm; 