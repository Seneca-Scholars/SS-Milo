import './App.css';
import{
  BrowserRouter as Router, 
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {Dashboard} from "./pages/DASH/DASH.js"
import {LoginRegister} from "./pages/LoginRegister/LoginRegister.js"
import {UserForm} from "./pages/UserForm/UserForm.jsx"

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
        <Route path="/" element={<Navigate replace to="/Dash" />} />
          <Route path='/Dash' element={<Dashboard />} />
          <Route path='/LoginRegister' element={<LoginRegister/>}/>
          <Route path='/UserForm' element={<UserForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;



