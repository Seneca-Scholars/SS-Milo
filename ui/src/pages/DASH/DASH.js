import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // its already set to true

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); //U dont think you need this 
      try {

        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data);
      } catch (error) {
      } finally{
        setIsLoading(false) 
       } 
    };

    fetchUserData();
  }, []);
  // all you need to do is start displaying your data
  return (
    <div>
      {isLoading && <p>Loading user data...</p>}
      {userData && <p>Welcome, {userData.name}!</p>}
    </div>
  );
};

