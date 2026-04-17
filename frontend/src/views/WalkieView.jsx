import React, { useEffect, useState, useRef } from "react";
import { api } from "../lib/api";
import { Radio, Mic, Video } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import HelpTip from "../components/rt/HelpTip";

// Simple beep via Web Audio
function beep(freq = 880, dur = 0.12) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
  } catch { /* no-op */ }
}

export default function WalkieView({ onVideoCall }) {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [target, setTarget] = useState(null);
  const [talking, setTalking] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => { api.get("/members").then((r) => setMembers(r.data || [])); }, []);

  const ping = async (m) => {
    try { await api.post("/walkie/ping", { to_user: m.id }); beep(1100, 0.15); toast.success(`Pinged ${m.name}`); }
    catch { toast.error("Couldn't ping"); }
  };

  const startTalk = () => {
    if (!target) return;
    setTalking(true);
    beep(660, 0.08);
    timerRef.current = setTimeout(() => endTalk(), 10000);
  };
  const endTalk = () => {
    setTalking(false);
    beep(440, 0.15);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const online = members.filter((m) => m.status === "online" && m.id !== user?.id);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <HelpTip section="walkie" text="Push to talk. Like a real walkie talkie. Ping someone to get their attention." />
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>Walkie Talkie</h1>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 14 }}>
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 420 }}>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
            {target ? `Talking to ${target.name}` : "Select a member to talk with"}
          </div>
          {target && (
            <div style={{ position: "relative", width: 140, height: 140, marginBottom: 24 }}>
              <div className="avatar" style={{ width: 140, height: 140, borderRadius: "50%", background: target.color, fontSize: 40 }}>{target.initials}</div>
              {talking && (
                <div style={{ position: "absolute", inset: -18, borderRadius: "50%", border: "3px solid var(--mac-red)", animation: "pulseTalk 1.4s ease-in-out infinite" }} />
              )}
            </div>
          )}
          <button
            className={`talk-btn ${talking ? "active" : ""}`}
            onMouseDown={startTalk} onMouseUp={endTalk} onMouseLeave={endTalk}
            onTouchStart={startTalk} onTouchEnd={endTalk}
            disabled={!target}
            data-testid="walkie-talk-btn"
            style={{ opacity: target ? 1 : 0.5 }}
          >
            <Mic size={15} /> {talking ? "Talking…" : "Hold to Talk"}
          </button>
          {target && <button className="btn btn-secondary" onClick={() => onVideoCall?.(target)} style={{ marginTop: 16 }} data-testid="walkie-video-from-panel"><Video size={13} /> Video Call Instead</button>}
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Online Members</div>
          {online.length === 0 ? (
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Nobody's online. Ping later.</div>
          ) : online.map((m) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border-light)" }}>
              <div className="avatar" style={{ width: 32, height: 32, background: m.color, fontSize: 11 }}>{m.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 10, color: "var(--mac-green)" }}>● Online</div>
              </div>
              <button className="btn btn-secondary" onClick={() => setTarget(m)} data-testid={`walkie-select-${m.id}`}>Select</button>
              <button className="btn btn-secondary" onClick={() => ping(m)} data-testid={`walkie-pingnow-${m.id}`}><Radio size={12} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
