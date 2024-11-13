import React, { useState } from "react"

const addUserForm = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ firstName,lastName}); //paases data to the submit func
    };


return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />

        <input 
        type="text"
        id="lastName"
        onChange={(e) => setLastName(e.target.value)}
        />

        <button type="submit"> add user</button>
        </form>
        
);
};
export default addUserForm;
