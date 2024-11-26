import React from "react";
import "./searchResultList.css";
import ResultItem from "./ResultItem";

export const SearchResultsList = ({ results }) => {
  console.log("brah", results);

  
  return (
    <div className="results-list">
      {results.length > 0 ? (
        results.map((result) => (
          <ResultItem key={result.id} result={result} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsList;
