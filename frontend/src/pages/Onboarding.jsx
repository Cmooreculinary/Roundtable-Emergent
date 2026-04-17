import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api, formatApiErrorDetail } from "../lib/api";
import { Armchair, Users, Sparkles, Link2, Mail, MessageSquare, Check, Copy } from "lucide-react";
import { toast } from "sonner";

const COLORS = [
  "#007AFF", "#34C759", "#FF9500", "#FF3B30",
  "#AF52DE", "#FF2D55", "#FFCC00", "#5AC8FA",
];

export default function Onboarding() {
  const { user, updateMe, refresh } = useAuth();
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || "");
  const [color, setColor] = useState(user?.color || "#007AFF");
  const [status, setStatus] = useState(user?.status || "online");
  const [tableName, setTableName] = useState("");
  const [tableColor, setTableColor] = useState("#34C759");
  const [tableActive, setTableActive] = useState(true);
  const [createdTable, setCreatedTable] = useState(null);
  const [inviteCode, setInviteCode] = useState("");
  const [busy, setBusy] = useState(false);

  const finish = async () => {
    await updateMe({ onboarded: true });
    await refresh();
    localStorage.setItem("rt-onboarded", "true");
    nav("/");
  };

  const saveProfile = async () => {
    setBusy(true);
    try {
      await updateMe({ name, color, status });
      setStep(3);
    } catch (e) {
      toast.error(formatApiErrorDetail(e.response?.data?.detail) || e.message);
    } finally {
      setBusy(false);
    }
  };

  const createTable = async () => {
    if (!tableName.trim()) return toast.error("Give your table a name");
    setBusy(true);
    try {
      const { data } = await api.post("/tables", { name: tableName.trim(), color: tableColor, active: tableActive });
      setCreatedTable(data);
      setStep(4);
    } catch (e) {
      toast.error(formatApiErrorDetail(e.response?.data?.detail) || e.message);
    } finally {
      setBusy(false);
    }
  };

  const generateInvite = async () => {
    if (!createdTable) return;
    setBusy(true);
    try {
      const { data } = await api.post("/invites", { table_id: createdTable.id, max_uses: 50, expires_in_days: 30 });
      setInviteCode(data.code);
      toast.success("Invite code ready");
    } catch (e) {
      toast.error(formatApiErrorDetail(e.response?.data?.detail) || e.message);
    } finally {
      setBusy(false);
    }
  };

  const copyInvite = () => {
    if (!inviteCode) return;
    navigator.clipboard.writeText(inviteCode).then(() => toast.success("Copied to clipboard"));
  };

  return (
    <div className="onboard-bg">
      <div className="onboard-card" data-testid="onboarding-card">
        <div className="onboard-progress">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={n <= step ? "done" : ""} />
          ))}
        </div>
        {step === 1 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="avatar" style={{ width: 52, height: 52, background: "var(--mac-blue)", borderRadius: 14 }}>
                <Armchair size={28} />
              </div>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Welcome to Round Table</h1>
                <p className="text-mute" style={{ margin: 0, fontSize: 14 }}>Where your people gather.</p>
              </div>
            </div>
            <div style={{ padding: 20, background: "var(--bg-tertiary)", borderRadius: 12, marginBottom: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Families, teams, faith communities, neighborhoods — your people don't fit in a chat thread.
              They fit around a table. Let's build yours.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
              <button className="btn btn-ghost" onClick={finish} data-testid="onboard-skip-btn" style={{ fontSize: 12 }}>Skip Tour</button>
              <button className="btn btn-primary" onClick={() => setStep(2)} data-testid="onboard-get-started" style={{ padding: "10px 20px" }}>Get Started</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "4px 0 4px" }}>Who's at the table?</h2>
            <p className="text-mute" style={{ fontSize: 13, marginBottom: 18 }}>This is how others will see you.</p>

            <label style={lbl}>Display Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} minLength={2} maxLength={50} data-testid="onboard-name-input" style={{ margin: "6px 0 14px" }} />

            <label style={lbl}>Seat Color</label>
            <div style={{ display: "flex", gap: 8, margin: "8px 0 16px", flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  data-testid={`onboard-color-${c.replace("#", "")}`}
                  style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: c, cursor: "pointer",
                    border: color === c ? "3px solid var(--text-primary)" : "1px solid var(--border-color)",
                    transition: "transform 0.15s ease",
                  }}
                />
              ))}
            </div>

            <label style={lbl}>Status</label>
            <select className="input" value={status} onChange={(e) => setStatus(e.target.value)} data-testid="onboard-status-select" style={{ margin: "6px 0 22px" }}>
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="dnd">Do Not Disturb</option>
            </select>

            <div style={footerRow}>
              <button className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary" disabled={busy || name.trim().length < 2} onClick={saveProfile} data-testid="onboard-profile-next">
                {busy ? "Saving…" : "Next"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "4px 0 4px" }}>Start your first Round Table</h2>
            <p className="text-mute" style={{ fontSize: 13, marginBottom: 18 }}>
              A table is where your group gathers. Think of it as your shared space.
            </p>

            <label style={lbl}>Table Name</label>
            <input
              className="input"
              placeholder="Family Circle, Study Group, Project Team…"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              maxLength={60}
              data-testid="onboard-table-name-input"
              style={{ margin: "6px 0 14px" }}
            />

            <label style={lbl}>Table Color</label>
            <div style={{ display: "flex", gap: 8, margin: "8px 0 16px", flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setTableColor(c)}
                  data-testid={`onboard-table-color-${c.replace("#", "")}`}
                  style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: c, cursor: "pointer",
                    border: tableColor === c ? "3px solid var(--text-primary)" : "1px solid var(--border-color)",
                  }}
                />
              ))}
            </div>

            <label style={{ ...lbl, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", textTransform: "none", fontSize: 13, fontWeight: 400 }}>
              <input type="checkbox" checked={tableActive} onChange={(e) => setTableActive(e.target.checked)} data-testid="onboard-table-active" />
              Make this table active (live)
            </label>

            {/* Preview */}
            <div style={{ marginTop: 18, padding: 18, background: "var(--bg-tertiary)", borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: tableColor, color: "#fff", display: "flex",
                alignItems: "center", justifyContent: "center", fontWeight: 700,
              }}>
                <Armchair size={22} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{tableName || "Your table name"}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  {tableActive ? "Live — people are gathered" : "Dormant"}
                </div>
              </div>
            </div>

            <div style={{ ...footerRow, marginTop: 18 }}>
              <button className="btn btn-ghost" onClick={() => setStep(2)}>Back</button>
              <button className="btn btn-primary" onClick={createTable} disabled={busy || !tableName.trim()} data-testid="onboard-create-table-btn">
                {busy ? "Creating…" : "Create Table"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "4px 0 4px" }}>Bring your people to the table</h2>
            <p className="text-mute" style={{ fontSize: 13, marginBottom: 18 }}>No one collaborates alone.</p>

            {!inviteCode ? (
              <button className="btn btn-primary" onClick={generateInvite} disabled={busy} data-testid="onboard-generate-invite" style={{ width: "100%", padding: "12px 16px" }}>
                <Link2 size={16} /> {busy ? "Generating…" : "Generate Invite Code"}
              </button>
            ) : (
              <div style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-light)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Your Invite Code</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, fontFamily: "Menlo, monospace" }}>{inviteCode}</div>
                  <button className="btn btn-secondary" onClick={copyInvite} data-testid="onboard-copy-invite"><Copy size={14} /> Copy</button>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 10 }}>
                  Share this code. Anyone can join by entering it in their Round Table.
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
              <button className="btn btn-secondary" onClick={() => window.location.href = `sms:?body=Join my Round Table with code ${inviteCode || "..."}`} disabled={!inviteCode}><MessageSquare size={14} /> Text</button>
              <button className="btn btn-secondary" onClick={() => window.location.href = `mailto:?subject=Come to my Round Table&body=Join with code: ${inviteCode || "..."}`} disabled={!inviteCode}><Mail size={14} /> Email</button>
            </div>

            <div style={{ ...footerRow, marginTop: 22 }}>
              <button className="btn btn-ghost" onClick={() => setStep(5)} data-testid="onboard-invite-skip">I'll do this later</button>
              <button className="btn btn-primary" onClick={() => setStep(5)} data-testid="onboard-invite-next">Next</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div className="avatar" style={{ width: 44, height: 44, background: "var(--mac-green)", borderRadius: 12 }}>
                <Sparkles size={22} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>You're all set</h2>
            </div>
            <p className="text-mute" style={{ fontSize: 13, marginBottom: 16 }}>Here's the lay of the land:</p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                ["Sidebar", "Your navigation. Tables, portal, calendar, messages."],
                ["Portal", "Your home base. Comms hub, widgets, quick actions."],
                ["Round Table", "The visual table where items and members live."],
                ["Dock", "Quick access to everything, macOS-style."],
                ["Dark Mode Toggle", "Easy on the eyes, day or night."],
              ].map(([t, d], i) => (
                <li key={t} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid var(--border-light)" : "none" }}>
                  <div className="avatar" style={{ width: 24, height: 24, background: "var(--mac-blue)", borderRadius: 6, fontSize: 11 }}>
                    <Check size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ ...footerRow, marginTop: 22 }}>
              <div />
              <button className="btn btn-primary" onClick={finish} data-testid="onboard-finish-btn" style={{ padding: "10px 22px" }}>
                Start Collaborating
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const lbl = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};
const footerRow = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 };
