import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import UserProfile from '../components/UserProfile';

function Dashboard() {
    const { user } = useContext(UserContext);
    if (!user) {
        return <Navigate to='/' replace />;
    }
    console.log(user);
    return (
    <div>
      <h1>welcome to the Dashboard!</h1>
      <UserProfile/>
      <p>user's dashboard.</p>
      </div>
  );
}
export default Dashboard;