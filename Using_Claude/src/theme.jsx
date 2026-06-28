// ============================================================
// theme.jsx — global light/dark theme using React Context.
//
// THE BIG IDEA: this file does NOT contain any colors. It only
// flips a single attribute on the <html> element:
//     <html data-theme="light">  or  <html data-theme="dark">
// index.css defines the actual colors for each mode as CSS
// variables (see :root and [data-theme='dark']). Flipping the
// attribute makes the browser re-resolve every var() at once.
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react'

// Create the context with a default shape. Any component that calls
// useTheme() will receive { theme, toggle }.
const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

// The provider holds the state and is mounted once (in main.jsx),
// above the whole app. `children` is everything it wraps.
export function ThemeProvider({ children }) {
  // Lazy initializer (a function) runs only on first render.
  // We read the saved choice from localStorage, defaulting to 'light'.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dm-theme') || 'light'
  })

  // Runs whenever `theme` changes: (1) tell the DOM which theme is
  // active so the CSS variables switch, and (2) remember the choice.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dm-theme', theme)
  }, [theme])

  // Flip between the two modes. Using the updater form (t => ...)
  // guarantees we toggle off the latest value.
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // Hand { theme, toggle } down to every descendant component.
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Convenience hook so components write `useTheme()` instead of
// `useContext(ThemeContext)`. Used by Login and Topbar.
export const useTheme = () => useContext(ThemeContext)
