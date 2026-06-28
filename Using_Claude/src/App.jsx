// ============================================================
// App.jsx — the route table. This maps each URL to the page
// component that should render for it. Think of it as the
// "switchboard" of the app.
// ============================================================

import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  return (
    // <Routes> renders the FIRST <Route> whose path matches the URL.
    <Routes>
      {/* "/" has no page of its own, so send the user to the login URL.
          `replace` swaps the history entry instead of adding one, so the
          back button won't get stuck bouncing back to "/". */}
      <Route path="/" element={<Navigate to="/DataMartEnterpriseSuite/login" replace />} />

      {/* The two real screens. */}
      <Route path="/DataMartEnterpriseSuite/login" element={<Login />} />
      <Route path="/DataMartEnterpriseSuite/dashboard" element={<Dashboard />} />

      {/* "*" = catch-all. Any unknown URL falls back to login. */}
      <Route path="*" element={<Navigate to="/DataMartEnterpriseSuite/login" replace />} />
    </Routes>
  )
}
