import React, { useState } from 'react';

const UpdateUserForm = ({ user, onSubmit }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
    console.log("deez nuts")
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (response.ok) {
        onSubmit(); //notify parent component
      } else {
        console.error('err updating user:', await response.text());
      }
    } catch (error) {
      console.error('err updating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;