import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultList.jsx";
import Dashboard from './pages/Dashboard.jsx';
import { Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm.jsx';

function App() {
  const [results, setResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
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
          <Route    path="/dashboard"  
            element={<Dashboard />} 
          /> 
          <Route path="/register" element={<RegisterForm />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;