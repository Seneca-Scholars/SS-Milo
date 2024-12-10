import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('err fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>id: {user.id}</p>
          {user.firstName && <p>First Name: {user.firstName}</p>}
          {user.lastName && <p>Last Name: {user.lastName}</p>}
        </div>
      )}
    </div>
  );
}

export default UserProfile;