import React, { useEffect, useState } from 'react';

function UserDetail({ userId }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/users/${userId}`); 
  
          if (!response.ok) {
            throw new Error('failed to fetch user data');
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          setError(error.message);   
  
        }
      };
  
      fetchUser();
    }, [userId]);
  
    return (
      <div>
        {error ? (
          <p>Error fetching user data: {error}</p>
        ) : (
          user ? (
            <div>
              <h2>{user.firstName} {user.lastName}</h2>
              <p>Email: {user.email}</p>
              {/* ... other user details ... */}
            </div>
          ) : (
            <p>Loading...</p>
          )
        )}
      </div>
    );
  }
  
  export default UserDetail;