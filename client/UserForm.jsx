import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        name,
        email,
        password
      });

   
    } catch (error) {
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;