import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Armchair } from "lucide-react";

const NO_CONTACT_AUTOFILL = {
  autoComplete: "off",
  "data-1p-ignore": "true",
  "data-lpignore": "true",
  "data-form-type": "other",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/welcome", { replace: true });
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
          <div className="avatar" style={{ width: 44, height: 44, background: "var(--mac-purple)", borderRadius: 12 }}>
            <Armchair size={24} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Create your seat</div>
            <div className="text-mute" style={{ fontSize: 12 }}>Your secure setup starts here.</div>
          </div>
        </div>

        <form onSubmit={submit} autoComplete="off">
          <label htmlFor="register-display-name" style={labelStyle}>Display Name</label>
          <input
            id="register-display-name"
            name="rt_registration_display_label"
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={2}
            maxLength={60}
            spellCheck="false"
            {...NO_CONTACT_AUTOFILL}
            data-testid="register-name-input"
            style={{ margin: "6px 0 14px" }}
          />

          <label htmlFor="register-email" style={labelStyle}>Email</label>
          <input
            id="register-email"
            name="email"
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            required
            data-testid="register-email-input"
            style={{ margin: "6px 0 14px" }}
          />

          <label htmlFor="register-password" style={labelStyle}>Password</label>
          <input
            id="register-password"
            name="new-password"
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
            data-testid="register-password-input"
            style={{ margin: "6px 0 14px" }}
          />

          {error && <div role="alert" style={{ color: "var(--mac-red)", fontSize: 12, marginBottom: 10 }}>{error}</div>}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={busy || name.trim().length < 2 || !email.trim() || password.length < 6}
            data-testid="register-submit-btn"
            style={{ width: "100%", padding: "10px 14px", fontSize: 14 }}
          >
            {busy ? "Creating…" : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--text-secondary)" }}>
          Already have a seat?{" "}
          <Link to="/login" style={{ color: "var(--mac-blue)", fontWeight: 600, textDecoration: "none" }} data-testid="register-go-login">
            Sign in
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
