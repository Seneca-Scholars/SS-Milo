import React , { useState } from 'react';
import "./searchResult.css";
const wait = async (ms) => {return new Promise((resolve)=> setTimeout(resolve, ms))}
export const SearchResult = ({ result, gifUrl }) => {
  const [showGif, setShowGif] = useState(false);

  const handleClick = async () => {
    // Start loading
    setShowGif(true);
    await wait(5000) // put aysnc opp here
    setShowGif(false)
  };

    return (
      <div  className="search-result" onClick={handleClick}>
        {result}
        <div className='gif-container'>
        {showGif && (
         <img src="/loadin.gif" alt='hi'/>
       )} 
      </div>
      </div>
    );
  };