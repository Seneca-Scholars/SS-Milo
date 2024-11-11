import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch('http://localhost:3000/search?q')
         .then((response) => response.json())
       .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
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
    </div>
  );
};

export default SearchBar;