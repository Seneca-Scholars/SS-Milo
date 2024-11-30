import React,{ useState } from 'react'
import './App.css'
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultList.jsx";

function App() {
  const [results, setResults] = useState([]);
  console.log("playdo", results)
  return (
   <div className="App">
    <header>
      LETS TAKE A LOOK
    </header>
   <div className="search-bar-container">
    <SearchBar setResults={setResults}/>
    <SearchResultsList results={results} />
    </div>
    </div>
  );
}

export default App
