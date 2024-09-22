import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AuthForm from './components/authForm.jsx';
import Home from './pages/home.jsx';

function App() {


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signUp" element={<AuthForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>    
      </Router>
  );
}

export default App;