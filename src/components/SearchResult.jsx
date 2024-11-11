import React , { useState } from 'react';
import "./searchResult.css";
export const SearchResult = ({ result, gifUrl }) => {
  const [showGif, setShowGif] = useState(false);

  const handleClick = () => {
    setShowGif(!showGif);
  };

    return (
      <div  className="search-result" onClick={handleClick}>
        {result}
        <div className='gif-container'>
        {/* {showGif && ( */}
         <img src="/adorableness.jpeg" alt='hi'/>
      {/* )} */}
      </div>
      </div>
    );
  };