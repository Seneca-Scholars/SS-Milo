import React from "react";
import { SearchResult } from "./SearchResult";

export const ResultItem = ({ result }) => {
  return (
    <SearchResult result={result} key={result.id} on>
      <p>{result.firstName}</p>
      <p>{result.lastName}</p>
    </SearchResult>
  );
};

export default ResultItem;
