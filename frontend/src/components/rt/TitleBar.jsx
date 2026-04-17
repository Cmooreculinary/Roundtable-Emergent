import React from "react";
import { Bell, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function TitleBar({ notificationsCount = 0, onOpenNotifications }) {
  const { user, logout } = useAuth();
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("rt-theme", next ? "dark" : "light");
  };

  return (
    <header className="title-bar" data-testid="title-bar">
      <div className="traffic-lights">
        <span className="traffic-light tl-close" title="Close" />
        <span className="traffic-light tl-min" title="Minimize" />
        <span className="traffic-light tl-max" title="Maximize" />
      </div>
      <div className="title-bar-title">Round Table</div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
        <button className="btn btn-ghost" onClick={toggleTheme} title="Toggle theme" data-testid="theme-toggle-btn" style={{ padding: 6 }}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="btn btn-ghost" onClick={onOpenNotifications} title="Notifications" data-testid="notifications-btn" style={{ padding: 6, position: "relative" }}>
          <Bell size={16} />
          {notificationsCount > 0 && (
            <span style={{
              position: "absolute", top: 2, right: 2, minWidth: 14, height: 14, padding: "0 4px",
              borderRadius: 999, background: "var(--mac-red)", color: "#fff", fontSize: 9, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{notificationsCount}</span>
          )}
        </button>
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 10, borderLeft: "1px solid var(--border-light)" }}>
            <div className="avatar" style={{ width: 26, height: 26, background: user.color || "#007AFF", fontSize: 11 }}>{user.initials}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{user.name}</div>
            <button className="btn btn-ghost" title="Sign out" onClick={logout} data-testid="logout-btn" style={{ padding: 4 }}>
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
