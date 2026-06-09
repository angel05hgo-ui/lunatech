import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { MonedaProvider } from './context/MonedaContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MonedaProvider>
        <App />
      </MonedaProvider>
    </BrowserRouter>
  </React.StrictMode>
)
