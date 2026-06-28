// ============================================================
// Login.jsx — the sign-in screen.
//
// LAYOUT: a two-column CSS grid (.login). Left = teal marketing
// "hero", right = the form card. The hero hides on narrow
// screens via a media query in index.css.
//
// STATE: each input is a "controlled component" — React holds the
// value in useState and the <input> just displays it. Typing fires
// onChange, which updates state, which re-renders the input.
// ============================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Database, ShieldCheck, LayoutGrid, Receipt, Boxes, ShoppingCart,
  TrendingUp, Factory, Users, Wallet, HeartHandshake, Building2, Truck,
  Moon, Sun, Building, Mail, Lock, Eye, EyeOff, ArrowRight,
} from 'lucide-react'
import { useTheme } from '../theme.jsx'

// The pill "chips" shown on the hero panel — same data-driven .map()
// pattern as the sidebar.
const modules = [
  { label: 'Admin', icon: ShieldCheck },
  { label: 'Common', icon: LayoutGrid },
  { label: 'Accounts', icon: Receipt },
  { label: 'Inventory', icon: Boxes },
  { label: 'Procure', icon: ShoppingCart },
  { label: 'Sales', icon: TrendingUp },
  { label: 'Production', icon: Factory },
  { label: 'HR', icon: Users },
  { label: 'Payroll', icon: Wallet },
  { label: 'CRM', icon: HeartHandshake },
  { label: 'Assets', icon: Building2 },
  { label: 'Fleet', icon: Truck },
]

export default function Login() {
  const navigate = useNavigate()       // to send the user to the dashboard
  const { theme, toggle } = useTheme() // theme switch in the top-right

  // One piece of state per field. The values are pre-filled to match
  // the design mockup.
  const [company, setCompany] = useState('DataMart Corp')
  const [email, setEmail] = useState('admin@datamart.com')
  const [password, setPassword] = useState('password')
  const [showPw, setShowPw] = useState(false)   // toggles password visibility
  const [remember, setRemember] = useState(true)

  // Form submit. preventDefault() stops the browser's default full-page
  // reload. This is a demo, so there's no auth — we just navigate.
  const onSubmit = (e) => {
    e.preventDefault()
    navigate('/DataMartEnterpriseSuite/dashboard')
  }

  return (
    <div className="login">
      {/* ---------- left hero (marketing panel) ---------- */}
      <aside className="login__hero">
        <div className="login__brand">
          <span className="brand-mark"><Database size={26} /></span>
          DataMart <b>Enterprise Suite</b>
        </div>

        <div className="login__hero-body">
          <h1 className="login__headline">
            One platform.<br />Every part of your business.
          </h1>
          <p className="login__sub">
            A unified, eye-comfortable ERP — from finance and inventory to
            production, HR, CRM and fleet. Designed to be calm to work in, all day.
          </p>

          {/* render one pill per module (icon renamed to Icon for JSX) */}
          <div className="login__chips">
            {modules.map(({ label, icon: Icon }) => (
              <span className="chip" key={label}>
                <Icon size={16} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="login__hero-foot">
          <ShieldCheck size={16} />
          Bank-grade security · Role-based access · Full audit trail
        </div>
      </aside>

      {/* ---------- right panel (the form) ---------- */}
      <section className="login__panel">
        {/* floating theme toggle; icon depends on current theme */}
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <div className="login__card">
          <div className="login__logo-badge"><Database size={28} /></div>
          <h2 className="login__title">Welcome back</h2>
          <p className="login__caption">Sign in to your enterprise workspace</p>

          {/* onSubmit fires on button click OR Enter key inside the form */}
          <form className="form" onSubmit={onSubmit}>
            {/* Each field = label + an .input wrapper (icon + <input>).
                The wrapper is what gives the leading icon and focus ring;
                the real <input> sits inside it with a transparent bg. */}
            <div className="field">
              <label>Company</label>
              <div className="input">
                <Building size={18} />
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company"
                />
              </div>
            </div>

            <div className="field">
              <label>Email address</label>
              <div className="input">
                <Mail size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input">
                <Lock size={18} />
                {/* type flips between 'password' (dots) and 'text' */}
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {/* type="button" so this does NOT submit the form */}
                <button
                  type="button"
                  className="eye"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label="Toggle password"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* remember-me + forgot link on one row */}
            <div className="form__row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a className="link" href="#">Forgot password?</a>
            </div>

            {/* type="submit" triggers onSubmit above */}
            <button type="submit" className="btn-primary">
              Sign in <ArrowRight size={18} />
            </button>
          </form>

          <p className="login__demo">Demo build — any password signs you in.</p>
        </div>

        <div className="login__copyright">© 2026 DataMart Enterprise Suite · v1.0</div>
      </section>
    </div>
  )
}
