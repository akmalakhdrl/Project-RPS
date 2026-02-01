/**
 * MAIN.JSX - Entry Point Frontend
 * 
 * File ini adalah titik awal aplikasi React
 * Fungsi: render komponen App ke dalam HTML
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Render aplikasi ke element dengan id "root" di index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
