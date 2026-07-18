import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Armchair } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await login(email.trim(), password);
      navigate(user.onboarded ? "/" : "/welcome", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="onboard-bg onboard-bg--scrollable">
      <div style={betaBadgeStyle} data-testid="beta-badge">BETA</div>
      <div className="onboard-card" style={{ maxWidth: 420, margin: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div className="avatar" style={{ width: 44, height: 44, background: "var(--mac-blue)", borderRadius: 12 }}>
            <Armchair size={24} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Roundtable_VO</div>
            <div className="text-mute" style={{ fontSize: 12 }}>Where your people gather.</div>
          </div>
        </div>

        <form onSubmit={submit} autoComplete="on">
          <label htmlFor="login-email" style={labelStyle}>Email</label>
          <input
            id="login-email"
            name="username"
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            inputMode="email"
            data-testid="login-email-input"
            style={{ margin: "6px 0 14px" }}
            required
          />

          <label htmlFor="login-password" style={labelStyle}>Password</label>
          <input
            id="login-password"
            name="password"
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            data-testid="login-password-input"
            style={{ margin: "6px 0 14px" }}
            required
          />

          {error && <div role="alert" style={{ color: "var(--mac-red)", fontSize: 12, marginBottom: 10 }}>{error}</div>}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={busy || !email.trim() || !password}
            data-testid="login-submit-btn"
            style={{ width: "100%", padding: "10px 14px", fontSize: 14 }}
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--text-secondary)" }}>
          New here?{" "}
          <Link to="/register" style={{ color: "var(--mac-blue)", fontWeight: 600, textDecoration: "none" }} data-testid="login-go-register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

const betaBadgeStyle = {
  position: "fixed",
  top: 18,
  right: 18,
  zIndex: 210,
  background: "#1a3a6b",
  color: "#fff",
  padding: "6px 16px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1.5,
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};
