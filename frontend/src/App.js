import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import MainShell from "./pages/MainShell";
import JoinByCode from "./pages/JoinByCode";
import { Toaster } from "sonner";
import "./App.css";
import "./styles/onboarding.css";

const ThemeGate = ({ children }) => {
  useEffect(() => {
    const saved = localStorage.getItem("rt-theme");
    // Dark mode is the default
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      if (!saved) localStorage.setItem("rt-theme", "dark");
    }
  }, []);
  return children;
};

const Protected = ({ children }) => {
  const { user } = useAuth();
  if (user === null) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-mute" style={{ fontSize: 13 }}>Loading your table…</div>
      </div>
    );
  }
  if (user === false) return <Navigate to="/login" replace />;
  if (!user.onboarded) return <Navigate to="/welcome" replace />;
  return children;
};

const RedirectIfAuthed = ({ children }) => {
  const { user } = useAuth();
  if (user && user !== false) {
    return user.onboarded ? <Navigate to="/" replace /> : <Navigate to="/welcome" replace />;
  }
  return children;
};

const OnboardGate = ({ children }) => {
  const { user } = useAuth();
  if (user === null) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-mute" style={{ fontSize: 13 }}>Securing your setup…</div>
      </div>
    );
  }
  if (user === false) return <Navigate to="/login" replace />;
  if (user.onboarded) return <Navigate to="/" replace />;
  return children;
};

// After login/register, consume pending invite code from sessionStorage
function PendingInviteHandler() {
  const { user } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (!user || user === false) return;
    if (!user.onboarded) return;
    const code = sessionStorage.getItem("rt-pending-code");
    if (!code) return;
    if (loc.pathname.startsWith("/join/")) return;
    sessionStorage.removeItem("rt-pending-code");
    nav(`/join/${code}`, { replace: true });
  }, [user, loc.pathname, nav]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <ThemeGate>
        <BrowserRouter>
          <Toaster position="top-right" theme="system" richColors />
          <PendingInviteHandler />
          <Routes>
            <Route path="/join/:code" element={<JoinByCode />} />
            <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
            <Route path="/register" element={<RedirectIfAuthed><Register /></RedirectIfAuthed>} />
            <Route path="/welcome" element={<OnboardGate><Onboarding /></OnboardGate>} />
            <Route path="/*" element={<Protected><MainShell /></Protected>} />
          </Routes>
        </BrowserRouter>
      </ThemeGate>
    </AuthProvider>
  );
}

export default App;
