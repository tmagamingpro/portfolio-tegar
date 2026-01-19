import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Set API URL dari environment atau default
window.__API_URL__ = import.meta.env.VITE_API_URL || 'https://portfolio-tegar-backend.vercel.app'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
