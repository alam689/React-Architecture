// ============================================================
// Sidebar.jsx — the left navigation (the main deliverable).
//
// TWO PATTERNS TO LEARN HERE:
//  1) Data-driven UI: the 12 modules live in an array and are
//     rendered with .map(), so adding a module = adding one line
//     of data, not copy-pasting JSX.
//  2) "Lifted" state: this component does NOT track which item is
//     selected. The parent (Dashboard) owns `active` and passes it
//     in, along with `onSelect` to change it. Sidebar is a pure
//     renderer driven by props.
// ============================================================

import {
  Database, LayoutDashboard, ShieldCheck, LayoutGrid, Receipt, Boxes,
  ShoppingCart, TrendingUp, Factory, Users, Wallet, HeartHandshake,
  Building2, Truck, Settings,
} from 'lucide-react'

// The module list. `key` is a stable id used for matching + React's
// list key; `label` is the visible text; `icon` is the component itself
// (note: a component reference, not <Component/>).
const modules = [
  { key: 'sysadmin', label: 'System Administration', icon: ShieldCheck },
  { key: 'common', label: 'Common Application', icon: LayoutGrid },
  { key: 'accounts', label: 'Accounts', icon: Receipt },
  { key: 'inventory', label: 'Inventory', icon: Boxes },
  { key: 'procurement', label: 'Procurement', icon: ShoppingCart },
  { key: 'sales', label: 'Sales', icon: TrendingUp },
  { key: 'production', label: 'Production', icon: Factory },
  { key: 'hr', label: 'Human Resources', icon: Users },
  { key: 'payroll', label: 'Payroll', icon: Wallet },
  { key: 'crm', label: 'CRM', icon: HeartHandshake },
  { key: 'assets', label: 'Fixed Asset Management', icon: Building2 },
  { key: 'fleet', label: 'Fleet Management', icon: Truck },
]

// Props:
//   active   — the key of the currently selected item (a string)
//   onSelect — callback the parent gave us to change the selection
export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      {/* --- brand row (logo + name) --- */}
      <div className="sidebar__brand">
        <span className="mark"><Database size={22} /></span>
        DataMartSuite
      </div>

      {/* --- scrollable nav region (flex:1 so it fills the height) --- */}
      <nav className="sidebar__nav">
        {/* Dashboard is special (not in the modules array), so it's
            written out by hand. The active class is added only when
            `active` equals this item's key — that's the green pill. */}
        <button
          className={`nav-item ${active === 'dashboard' ? 'active' : ''}`}
          onClick={() => onSelect('dashboard')}
        >
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        <div className="sidebar__label">MODULES</div>

        {/* The 12 modules. We rename `icon` to `Icon` while destructuring
            because JSX treats Capitalized names as components — <Icon/>
            renders, <icon/> would not. `key={key}` helps React track the
            list across re-renders. */}
        {modules.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`nav-item ${active === key ? 'active' : ''}`}
            onClick={() => onSelect(key)}
          >
            <Icon size={19} />
            {label}
          </button>
        ))}
      </nav>

      {/* --- pinned footer, separated by a top border in CSS --- */}
      <div className="sidebar__foot">
        <button
          className={`nav-item ${active === 'settings' ? 'active' : ''}`}
          onClick={() => onSelect('settings')}
        >
          <Settings size={19} />
          Settings
        </button>
      </div>
    </aside>
  )
}
