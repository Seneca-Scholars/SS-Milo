import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultList.jsx";
// import UserDetail from '../pages/userDetail.jsx'

function App() {
  const [results, setResults] = useState([]);
  console.log("playdo", results)
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          LETS TAKE A LOOK
        </header>
        <div className="search-bar-container">
          <SearchResultsList results={results} />
        </div>
        <Routes>
        <Route path="/" element={<SearchBar />} />
        {/* <Route path="/users/:userId" element={<UserDetail />} /> */}
        </Routes>
      </div>
      <div>
      
      </div>
    </BrowserRouter>
  );
}

export default App
