import React, { useEffect, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

export default function VideoCallOverlay({ target, onClose }) {
  const [connecting, setConnecting] = useState(true);
  const [muted, setMuted] = useState(false);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setConnecting(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 150,
      background: "rgba(0,0,0,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", color: "#fff",
    }} data-testid="video-call-overlay">
      <div style={{ textAlign: "center" }}>
        <div className="avatar" style={{
          width: 140, height: 140, borderRadius: "50%",
          background: target?.color || "#007AFF", color: "#fff",
          fontSize: 42, fontWeight: 700, margin: "0 auto 14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}>
          {target?.initials || "?"}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{target?.name || "Calling…"}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
          {connecting ? "Connecting…" : "00:00"}
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
        <button onClick={() => setMuted((v) => !v)} data-testid="videocall-mic" style={ctrl(muted ? "#FF3B30" : "rgba(255,255,255,0.15)")}>
          {muted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button onClick={() => setCamOn((v) => !v)} data-testid="videocall-cam" style={ctrl(!camOn ? "#FF3B30" : "rgba(255,255,255,0.15)")}>
          {camOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>
        <button onClick={onClose} data-testid="videocall-end" style={{ ...ctrl("#FF3B30"), width: 70 }}>
          <PhoneOff size={20} />
        </button>
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 20 }}>Press Escape to end</div>
    </div>
  );
}
const ctrl = (bg) => ({
  width: 56, height: 56, borderRadius: "50%", border: "none",
  background: bg, color: "#fff", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
});
