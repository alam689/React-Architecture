// ============================================================
// Topbar.jsx — the bar across the top of the dashboard.
// Holds the sidebar toggle, search, theme switch, bell, the
// user chip, and logout. It's a child of Dashboard.
// ============================================================

import { useNavigate } from 'react-router-dom'
import { Menu, Search, Moon, Sun, Bell, LogOut } from 'lucide-react'
import { useTheme } from '../theme.jsx'

// Prop: onToggleSidebar — handler from the parent that collapses /
// expands the sidebar. We don't own that state; we just trigger it.
export default function Topbar({ onToggleSidebar }) {
  const navigate = useNavigate()       // for the logout redirect
  const { theme, toggle } = useTheme() // read + flip the global theme

  return (
    <header className="topbar">
      {/* hamburger — tells the parent to collapse the sidebar */}
      <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        <Menu size={20} />
      </button>

      {/* search box (visual only here — no search logic wired up) */}
      <div className="search">
        <Search size={18} />
        <input placeholder="Search modules, screens, records…" />
        <span className="kbd">Ctrl K</span>
      </div>

      {/* flexible spacer pushes everything after it to the right edge */}
      <div className="topbar__spacer" />

      {/* theme toggle — shows a Moon in light mode, a Sun in dark mode */}
      <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
        {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
      </button>

      {/* notifications — the little dot is styled by .bell-dot in CSS */}
      <button className="icon-btn" aria-label="Notifications">
        <Bell size={19} />
        <span className="bell-dot" />
      </button>

      {/* user chip (avatar + name + org) */}
      <div className="user">
        <div className="user__avatar">A</div>
        <div className="user__meta">
          <div className="user__name">Administrator</div>
          <div className="user__org">DataMart Corp</div>
        </div>
      </div>

      {/* logout — there's no real session, so we just route to login */}
      <button
        className="icon-btn"
        onClick={() => navigate('/DataMartEnterpriseSuite/login')}
        aria-label="Sign out"
      >
        <LogOut size={19} />
      </button>
    </header>
  )
}
