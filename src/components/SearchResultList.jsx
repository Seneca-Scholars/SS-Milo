import React from "react";
import "./searchResultList.css";
import { SearchResult } from "./SearchResult";



export const SearchResultsList = ({ results, onSelectUser, onDeleteUser }) => {
  console.log("brah", results);

  
 
  return (
    <div className="results-list">
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <SearchResult key={result.id} result={result} onSelectUser={onSelectUser}
               />
             <button onClick={() => onDeleteUser(result.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )};

export default SearchResultsList;
