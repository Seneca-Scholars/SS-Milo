import "./searchResultList.css";

import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, index) => {
        return <SearchResult
        key={index} {...result}
        firstName={result.user?.firstName}
        lastName={result.user?.lastName} 
        />;
      })}
    </div>
  );
};


