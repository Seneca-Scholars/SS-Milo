import React, { useState } from "react";
import { SearchResult } from "./SearchResult";

const SelectUser = ({ selectedUser, onSelect }) => {
  console.log("Selected user:", selectedUser);
  onSelect(selectedUser);
  return null;
};


export const ResultItem = ({ result, onSelectUser }) => {
  return (
    <SearchResult result={result} key={result.id}>
      <p>{result.firstName}</p>
      <p>{result.lastName}</p>
      <button onClick={() => onSelectUser(result)}>Select</button>
    </SearchResult>
  );
};

export default ResultItem;
