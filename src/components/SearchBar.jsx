import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";
import "./searchBar.css";


export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async (value) => {
    try {
      const response = await fetch("http://localhost:3000/search?q");
      const json = await response.json();

      const results = json.filter((user) => {
        const lowerCaseValue = value.toLowerCase();
        return (
          user &&
          (user.firstName?.toLowerCase().includes(lowerCaseValue) ||
            user.lastName?.toLowerCase().includes(lowerCaseValue))
        );
      });
      console.log("filtered results:", results);

      setResults(results);
    } catch (error) {
      console.error("err filtering user:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleOpenAddUserForm = () => {
    setIsAddUserFormOpen(true);
  };

  const handleCloseAddUserForm = () => {
    setIsAddUserFormOpen(false);
  };

  const onSelectUser = (user) => {
    setSelectedUser(user);
    
  };

  return (
    <div className="search-bar-container">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="type to search.."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
<div>
        <button onClick={handleOpenAddUserForm} className="add-user-button">
          add user.
        </button>
<br/>
        {isAddUserFormOpen && <AddUserForm onSubmit={handleCloseAddUserForm} />}
        
        {selectedUser && (
          <button className="update-user-button" onClick={() => setSelectedUser(null)}>
            update User
          </button>
        )}
        {selectedUser && (
          <UpdateUserForm user={selectedUser} onSubmit={() => setSelectedUser(null)} />
        )} 
      </div>
    </div>
    </div>
  );
};

export default SearchBar;
