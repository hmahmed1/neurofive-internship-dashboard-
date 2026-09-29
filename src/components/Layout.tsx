import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import "../shell.css";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: "🏠" },
  { path: "/internships", label: "Internships", icon: "💼" },
  { path: "/saved", label: "Saved", icon: "⭐" },
  { path: "/analytics", label: "Analytics", icon: "📊" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="shell">
      {/* Sidebar */}
      <aside className={`shell__sidebar ${sidebarOpen ? "is-open" : ""}`} aria-label="Dashboard navigation">
        <div className="shell__sidebar-header">
          <Link to="/" className="shell__logo" aria-label="TalentBridge home">
            <span className="shell__logo-mark">TB</span>
            <span className="shell__logo-text">TalentBridge</span>
          </Link>
        </div>

        <nav className="shell__nav" aria-label="Main">
          <ul className="shell__nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`shell__nav-link ${isActive ? "shell__nav-link--active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shell__sidebar-footer">
          <p>v1.0 · Week 1 Task 2</p>
        </div>
      </aside>

      {/* Main area */}
      <div className="shell__main">
        {/* Topbar */}
        <header className="shell__topbar">
          <button
            className="shell__menu-toggle"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <span className="shell__menu-bar" />
            <span className="shell__menu-bar" />
            <span className="shell__menu-bar" />
          </button>

          <form className="shell__search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="global-search" className="visually-hidden">Search</label>
            <input
              id="global-search"
              type="search"
              className="shell__search-input"
              placeholder="Search internships..."
            />
          </form>

          <div className="shell__user">
            <span className="shell__avatar" aria-hidden="true">HA</span>
            <span className="shell__username">Hammad A.</span>
          </div>
        </header>

        {/* Page content — nested routes yahan render honge */}
        <main className="shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;