import React, { useState } from "react";
import { X, Armchair } from "lucide-react";
import { api, formatApiErrorDetail } from "../../lib/api";
import { toast } from "sonner";

const COLORS = ["#007AFF", "#34C759", "#FF9500", "#FF3B30", "#AF52DE", "#FF2D55", "#FFCC00", "#5AC8FA"];

export default function CreateTableModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#007AFF");
  const [active, setActive] = useState(true);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!name.trim()) return toast.error("Name required");
    setBusy(true);
    try {
      const { data } = await api.post("/tables", { name: name.trim(), color, active });
      toast.success(`Table "${data.name}" created`);
      onCreated?.(data);
    } catch (e) {
      toast.error(formatApiErrorDetail(e.response?.data?.detail) || e.message);
    } finally { setBusy(false); }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} data-testid="create-table-modal">
        <div style={{ padding: 18, borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar" style={{ width: 36, height: 36, background: color, borderRadius: 10 }}><Armchair size={18} /></div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Create a Round Table</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>A space for your people to gather.</div>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onClose} data-testid="create-table-close"><X size={16} /></button>
        </div>
        <div style={{ padding: 18 }}>
          <label style={lbl}>Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Family Circle, Project Team…" maxLength={80} data-testid="create-table-name" style={{ margin: "6px 0 14px" }} />
          <label style={lbl}>Color</label>
          <div style={{ display: "flex", gap: 8, margin: "8px 0 14px", flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <button key={c} onClick={() => setColor(c)} data-testid={`create-table-color-${c.replace("#", "")}`} style={{ width: 28, height: 28, borderRadius: 8, background: c, cursor: "pointer", border: color === c ? "3px solid var(--text-primary)" : "1px solid var(--border-color)" }} />
            ))}
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} data-testid="create-table-active" />
            Make this table live right now
          </label>
        </div>
        <div style={{ padding: 14, borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit} disabled={busy} data-testid="create-table-submit">{busy ? "Creating…" : "Create Table"}</button>
        </div>
      </div>
    </div>
  );
}
const lbl = { fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.5 };
