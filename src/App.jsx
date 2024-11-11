import React,{ useState } from 'react'
import './App.css'
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultList";

function App() {
  const [results, setResults] = useState([]);

  return (
   <div className="App">
    <header>
      LETS TAKE A LOOK
    </header>
   <div className="search-bar-container">
    <SearchBar setResults={setResults}/>
    {results && results.length > 0 && <SearchResultsList results={results} />}
    </div>
    </div>
  );
}

export default App
