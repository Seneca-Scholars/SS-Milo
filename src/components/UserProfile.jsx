import React, { useState, useEffect } from 'react';

export  function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json()
        setUser(data);
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