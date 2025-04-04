import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider as MaterialThemeProvider } from "@material-tailwind/react";
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MaterialThemeProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MaterialThemeProvider>
  </React.StrictMode>,
)