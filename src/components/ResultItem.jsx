import React from 'react';
import { SearchResult } from './SearchResult';
 export const ResultItem = ({ result }) => {
    console.log("fart", result)
    return (
        <SearchResult result={result} key={result.id}>
            <p>{result.firstName}</p>
            <p>{result.lastName}</p>
        </SearchResult>
    );
};

export default ResultItem;
