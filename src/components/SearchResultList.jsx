import React from 'react';
import "./searchResultList.css";
import ResultItem from './ResultItem'


export const SearchResultsList = ({ results }) => {
  console.log("bruh", results)
  return (
    <div className="results-list">
      {results.map((result) => {
          console.log("in map", result)
         return <ResultItem key={result.id} result={result}
        />;
      })}
    </div>
  );
};

export default SearchResultsList;