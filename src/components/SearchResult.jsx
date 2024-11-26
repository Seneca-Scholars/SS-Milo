import React, { useState } from "react";
import "./searchResult.css";
const wait = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SearchResult = ({ result, gifUrl, onSelectUser }) => {
  const [showGif, setShowGif] = useState(false);
  const [updateUser, setUpdateUser] = useState(false)
  console.log("recieved result:", result);
  
  const handleClick = async () => {
    setShowGif(true);
  
    console.log(updateUser)
    try {
      await wait(5000);
    } catch (error) {
      console.error("err during async op in gif:", error);
    } finally {
      setShowGif(false);
    }
    onSelectUser(result);
  };

  return (
    <a className="search-result" onClick={handleClick} href="/bruh">
      {result.firstName} {result.lastName}
      <div className={`gif-container ${showGif ? "show" : ""}`}>
        {showGif && <img src="/loadin.gif" alt="loaddd" />}
      </div>
    </a>
  );
};

