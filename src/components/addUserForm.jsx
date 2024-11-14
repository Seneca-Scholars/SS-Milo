import React, { useState } from "react"

const AddUserForm = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const response = await fetch ('http://localhost:3000/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName}),
        });
        if (response.ok) {
            console.log('ok');
            onSubmit();
        } else {
            console.error('err adding user:', await response.text());
        }
    }catch (error) {
        console.error('err adding user:', error);
    }
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
export default AddUserForm;
