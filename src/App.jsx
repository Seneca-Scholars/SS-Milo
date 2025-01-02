import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultList.jsx";
import Dashboard from './pages/Dashboard.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import { UserProvider } from './components/UserContext.jsx';
import { ProtectedRoute } from './components/pRoute.jsx';

function App() {
  return (
    <UserProvider> 
    <BrowserRouter>
      <div className="App">
        <header>
          LETS TAKE A LOOK
        </header>
        <Routes>
          <Route path="/" element={<SearchBar />} /> 
          <Route    path="/dashboard"  
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            } 
          /> 
          <Route path="/register" element={<RegisterForm />} /> 
        </Routes>
      </div>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App