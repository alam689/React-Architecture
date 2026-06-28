// ============================================================
// Dashboard.jsx — the home screen "shell" that HOSTS the sidebar.
//
// It owns two pieces of state and passes them down:
//   active    — which sidebar item is selected (given to Sidebar)
//   collapsed — whether the sidebar is hidden (toggled by Topbar)
//
// The KPI cards and activity feed below are STATIC placeholder
// data — they exist only to frame the sidebar, not as real
// features.
// ============================================================

import { useState } from 'react'
import {
  Calendar, ChevronRight, Grid3x3, ChevronDown, Eye,
  ShoppingCart, TrendingUp, Users,
} from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'

// Placeholder metrics for the four cards. `up` decides the pill color.
const kpis = [
  { label: 'Revenue (MTD)', value: '$1.24M', delta: '+8.6%', up: true },
  { label: 'Open Orders', value: '316', delta: '+12', up: true },
  { label: 'Inventory Value', value: '$4.8M', delta: '-1.2%', up: false },
  { label: 'Headcount', value: '742', delta: '+9', up: true },
]

// Placeholder activity rows. `tint`/`color` set the icon badge colors
// inline (these are intentionally fixed, not theme-aware).
const activity = [
  { icon: ShoppingCart, tint: '#efe6f7', color: '#7c5cbf', title: 'PO #PO-2418 approved', sub: 'Procurement', time: '4m ago' },
  { icon: TrendingUp, tint: '#e3efe9', color: '#2f6b5d', title: 'Invoice INV-90231 generated', sub: 'Sales', time: '21m ago' },
  { icon: Users, tint: '#fdeede', color: '#cf8a3c', title: '3 leave requests pending', sub: 'HR', time: '1h ago' },
]

export default function Dashboard() {
  // Source of truth for the sidebar selection. Sidebar reads `active`
  // and calls setActive via its onSelect prop — state lifted up to here.
  const [active, setActive] = useState('dashboard')
  // Sidebar collapse state; the hamburger in Topbar flips it.
  const [collapsed, setCollapsed] = useState(false)

  return (
    // The shell is a 2-column CSS grid: [sidebar | main].
    // Adding the 'collapsed' class swaps the grid to [0 | main].
    <div className={`shell ${collapsed ? 'collapsed' : ''}`}>
      {/* pass selection state down to the sidebar */}
      <Sidebar active={active} onSelect={setActive} />

      <div className="main">
        {/* give Topbar a handler to flip `collapsed` */}
        <Topbar onToggleSidebar={() => setCollapsed((c) => !c)} />

        {/* -------- placeholder dashboard content (frames the sidebar) -------- */}
        <div className="content">
          <div className="content__head">
            <div>
              <h1 className="greeting">Good day, Administrator 👋</h1>
              <div className="greeting__date">
                <Calendar size={16} />
                Sunday, June 28, 2026
              </div>
            </div>
            <button className="btn-ghost">
              Quick Actions <ChevronRight size={17} />
            </button>
          </div>

          {/* four KPI cards from the kpis array */}
          <div className="kpis">
            {kpis.map((k) => (
              <div className="kpi" key={k.label}>
                <div className="kpi__label">{k.label}</div>
                <div className="kpi__value">
                  <b>{k.value}</b>
                  {/* pill turns green (up) or red (down) */}
                  <span className={`pill ${k.up ? 'up' : 'down'}`}>{k.delta}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="section-head">
            <div className="section-head__title">
              <Grid3x3 size={20} />
              Modules <span>12 available</span>
            </div>
            {/* inline style here just makes this a secondary (outline) button */}
            <button className="btn-ghost" style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              <Eye size={16} /> Show modules <ChevronDown size={16} />
            </button>
          </div>

          <div className="banner">
            <div className="banner__icon"><Grid3x3 size={22} /></div>
            <div className="banner__text">
              <b>12 modules ready</b>
              <p>Your workspace is set up. Click to browse all modules.</p>
            </div>
          </div>

          <h2 className="section-head__title" style={{ marginTop: 32 }}>Recent activity</h2>

          {/* activity rows from the activity array */}
          <div className="activity">
            {activity.map((a) => (
              <div className="activity__row" key={a.title}>
                <div className="activity__icon" style={{ background: a.tint, color: a.color }}>
                  <a.icon size={19} />
                </div>
                <div className="activity__body">
                  <b>{a.title}</b>
                  <p>{a.sub}</p>
                </div>
                <div className="activity__time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
