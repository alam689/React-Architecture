# DataMart Enterprise Suite — Login & Sidebar (React)

A frontend-only React build of the **Login screen** and the **home-screen sidebar**
for the DataMart Enterprise Suite ERP demo. Built with Vite, React Router, and
lucide-react icons. Includes a working light/dark theme toggle.

> Scope: only the **Login** page and the **Sidebar** are real features. The
> dashboard KPI cards and activity feed are static placeholders that exist only
> to host the sidebar.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # preview the production build
```

Open the app in a **full-width browser window** to see the two-column login hero
and the sidebar (both collapse on narrow screens by design).

**Demo login:** any email / any password signs you in.

---

## Tech stack

| Tool | Why |
|------|-----|
| **Vite** | Fast dev server + build (matches the `localhost:5173` target) |
| **React 18** | UI library |
| **react-router-dom** | URL-based page routing |
| **lucide-react** | Clean line icons used throughout |

From an empty folder, the same stack is created with:

```bash
npm create vite@latest . -- --template react
npm install react-router-dom lucide-react
```

---

## Project structure

```
src/
├─ main.jsx          Entry point: mounts React, wraps app in providers
├─ App.jsx           Route table (URL → page)
├─ theme.jsx         Light/dark theme React Context
├─ index.css         ALL styling + theme color tokens
├─ pages/
│  ├─ Login.jsx      The login screen
│  └─ Dashboard.jsx  The home shell that hosts the sidebar
└─ components/
   ├─ Sidebar.jsx    The left nav (main deliverable)
   └─ Topbar.jsx     The top search / user bar
```

Mental model: **`main` wraps `App` → `App` picks a page by URL → each page
composes components.**

---

## Routes

| URL | Renders |
|-----|---------|
| `/` | redirects → login |
| `/DataMartEnterpriseSuite/login` | `<Login/>` |
| `/DataMartEnterpriseSuite/dashboard` | `<Dashboard/>` |
| anything else | redirects → login |

Navigation uses the `useNavigate()` hook. There is **no real auth** — the Sign-in
button simply navigates to the dashboard.

---

## Theming (the key concept)

The dark-mode toggle works everywhere with **zero per-component logic**, thanks to
**CSS custom properties** defined twice in `index.css`:

```css
:root {                 /* light theme defaults */
  --bg: #f4f0eb;
  --surface: #ffffff;
  --brand: #2f6b5d;     /* the teal-green */
  --text: #1d2b27;
  --sidebar-bg: #224d43;
  /* ...~25 tokens... */
}
[data-theme='dark'] {   /* dark overrides — same names, new values */
  --bg: #0e1614;
  --surface: #15211d;
  --text: #e7efeb;
  /* ... */
}
```

Every component uses `var(--name)` instead of hardcoded hex values:

```css
.kpi { background: var(--surface); color: var(--text); }
```

The toggle (`theme.jsx`) flips a single attribute on the root element:

```js
document.documentElement.setAttribute('data-theme', theme) // 'light' | 'dark'
```

Flip the attribute → the browser re-resolves every `var()` → the whole UI
re-themes instantly. It's a React Context so any component can call `toggle()`,
and the choice is saved to `localStorage` so it survives refresh.

**Rule to copy:** build your palette as tokens first; never hardcode a hex inside
a component.

---

## How the Login screen works (`pages/Login.jsx`)

Two-column **CSS Grid** (`.login { grid-template-columns: 1fr 1fr }`):

- **Left hero** — a flex column with three zones: brand (top), headline + module
  chips (centered with `margin: auto`), security line (bottom). Background is a
  layered `linear-gradient` + `radial-gradient`. The 12 chips come from an array
  rendered with `.map()`.
- **Right panel** — a centered card. Each field is an `.input` wrapper
  (leading icon + `<input>`), which gives the icon and the focus ring.

State is plain `useState` per field (`company`, `email`, `password`, `showPw`,
`remember`). The eye button toggles `type={showPw ? 'text' : 'password'}`.
Submitting calls `preventDefault()` then navigates.

**Responsive:** a `max-width: 980px` media query hides the hero and collapses to a
single column.

---

## How the Sidebar works (`components/Sidebar.jsx`)

Pattern: **data array → render loop**, not 12 hand-written buttons.

```jsx
const modules = [
  { key: 'sysadmin',  label: 'System Administration', icon: ShieldCheck },
  { key: 'inventory', label: 'Inventory',             icon: Boxes },
  // ...12 total
]
```

Three regions in a flex column:

1. **Brand** (`.sidebar__brand`) — database icon + "DataMartSuite"
2. **Scrollable nav** (`flex:1; overflow-y:auto`) — Dashboard button, a "MODULES"
   label, then `modules.map()` of nav buttons
3. **Pinned footer** (`.sidebar__foot`) — Settings, separated by a top border

**Active highlighting is driven by a prop** (state lifted to the parent):

```jsx
<button
  className={`nav-item ${active === key ? 'active' : ''}`}
  onClick={() => onSelect(key)}
>
```

The parent `Dashboard.jsx` owns the state:

```jsx
const [active, setActive] = useState('dashboard')
// ...
<Sidebar active={active} onSelect={setActive} />
```

The `.nav-item.active` CSS rule applies the solid green pill, white text, and
shadow.

---

## Dashboard shell (`pages/Dashboard.jsx`) + Topbar

The shell is a 2-column grid `grid-template-columns: 264px 1fr` (sidebar | main).
The hamburger toggles a `collapsed` state that switches the grid to `0 1fr` to
hide the sidebar.

`Topbar.jsx` holds the search bar, theme toggle, notification bell, user chip, and
logout button. The KPI cards and activity feed are **static placeholder arrays**
rendered with `.map()`.

---

## Build order (recommended)

1. Scaffold Vite + React; install `react-router-dom` + `lucide-react`.
2. Write `index.css` color tokens (`:root` + `[data-theme=dark]`) **first**.
3. Build `theme.jsx` (Context + `localStorage` + the `data-theme` attribute).
4. Wire `main.jsx` providers and `App.jsx` routes (with empty page stubs).
5. Build `Login.jsx` — get the two-column grid + `.input` wrapper working.
6. Build `Sidebar.jsx` from the `modules` array + active-prop pattern.
7. Build `Dashboard.jsx` shell (grid) + `Topbar.jsx`; drop the sidebar in.
8. Add the responsive media queries last.

---

## Three patterns that carry the whole design

1. **CSS variable tokens** for theming — one source of truth for color.
2. **Data array → `.map()`** for any repeated UI (chips, nav items, KPIs).
3. **Lifting state up** — the parent owns `active`; the sidebar is a pure
   renderer driven by props.

Master those three and the rest is styling.

---

## Possible next steps

- Wire sidebar items to real routes/pages instead of just setting `active`.
- Add a real auth flow (form validation, API call, protected routes).
- Extract reusable components (`<Input/>`, `<NavItem/>`, `<KpiCard/>`).
- Replace placeholder dashboard data with live data.
```
