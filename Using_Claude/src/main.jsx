// ============================================================
// main.jsx — the entry point. Vite loads this file first
// (see the <script> tag in index.html). Its only job is to
// mount React onto the page and wrap the app in the global
// providers every component needs.
// ============================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // gives us URL routing
import App from './App.jsx'
import { ThemeProvider } from './theme.jsx' // our light/dark theme context
import './index.css' // global styles — imported once here, applies everywhere

// Find <div id="root"> in index.html and render React into it.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode = dev-only helper that flags unsafe patterns. No effect in production.
  <React.StrictMode>
    {/* Providers wrap <App/> so every component inside can read them.    */}
    {/* Order here doesn't matter much — both just need to be ABOVE App.  */}
    <ThemeProvider>
      {/* BrowserRouter must wrap anything that uses routes or navigation. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
