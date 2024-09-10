import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Files from './components/pages/Files';
import Calendar from './components/pages/Calendar';
import LinksPage from './components/LinksPage';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/files' element={<Files />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/links' element={<LinksPage />} />
          <Route path='/contact' element={<ContactUs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
