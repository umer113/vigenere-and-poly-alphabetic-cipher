import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Vigenere from './vigenere.jsx'
import Poly from './poly.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Vigenere />} />
          <Route path="/poly" element={<Poly />} />
      </Routes>
    </BrowserRouter>
)
