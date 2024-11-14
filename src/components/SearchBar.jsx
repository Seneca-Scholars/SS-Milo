import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AddUserForm from "./addUserForm";
import "./searchBar.css";

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);

    const fetchData =  async (value) => {
      const response = await fetch('http://localhost:3000/search?q')
      const json = await response.json();
      const results = json.filter((user)  => 
        user && 
        (user.firstName?.toLowerCase().includes(value.toLowerCase()) || 
         user.lastName?.toLowerCase().includes(value.toLowerCase()))
      );
      setResults(results);
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
  }

  return (
    <div className="search-bar-container">
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="type to search.."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={handleOpenAddUserForm}
      className="add-user-link">
      add user.
      </button>
    {isAddUserFormOpen && (
     <AddUserForm onSubmit = {handleCloseAddUserForm} />
    )}
    </div>
    </div>
  );
};

export default SearchBar;