import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";
import DeleteUserForm from "./deleteUserForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { SearchResultsList } from "../components/SearchResultList";
// import { useNavigate } from 'react-router-dom';
import "./searchBar.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

  // const navigate = useNavigate();

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

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // navigate(`/users/${user.id}`);
  };
  const handleDeleteUser = (userId) => {
    console.log(`deleting user with id: ${userId}`);
  };
  
  const handleOpenLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const handleCloseLoginForm = () => {
    setIsLoginFormOpen(false);
  };
  const handleOpenRegisterForm = () => {
    setIsRegisterFormOpen(true);
  };

  const handleCloseRegisterForm = () => {
    setIsRegisterFormOpen(false);
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
      </div>
  
      <div className="search-results">
        {results.length > 0 ? (
          <SearchResultsList results={results} onSelectUser={handleSelectUser} onDeleteUser={handleDeleteUser} />
        ) : (
          <p>ni search results found.</p>
        )}
     
      <div>
      </div> 
        <button onClick={handleOpenAddUserForm} className="add-user-button">
          add user.
        </button>
        <br />
        {isAddUserFormOpen && <AddUserForm onSubmit={handleCloseAddUserForm} />}
  
        {selectedUser && (
          <button className="update-user-button" onClick={() => setSelectedUser(null)}>
            update User
          </button>
        )}
        {selectedUser && (
          <UpdateUserForm user={selectedUser} onSubmit={() => setSelectedUser(null)} />
        )}

{selectedUser && (
      <DeleteUserForm userId={selectedUser.id} onDelete={() => setSelectedUser(null)} />
    )}
 <div className="login-register-container">
        <button onClick={handleOpenLoginForm} className="login-button">
          Login
        </button>
        {isLoginFormOpen && <LoginForm onClose={handleCloseLoginForm} />}

        <button onClick={handleOpenRegisterForm} className="register-button">
          Register
        </button>
        {isRegisterFormOpen && <RegisterForm onClose={handleCloseRegisterForm} />}
      </div>
  
      </div>
    </div>
  );
};


export default SearchBar;
