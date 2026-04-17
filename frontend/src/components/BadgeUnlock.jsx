import React, { useEffect, useState } from "react";
import { Trophy, X } from "lucide-react";

const TIERS = [
  { count: 1, name: "Newcomer", color: "#5AC8FA" },
  { count: 3, name: "Host", color: "#34C759" },
  { count: 10, name: "Connector", color: "#FF9500" },
  { count: 25, name: "Community Builder", color: "#AF52DE" },
];

export default function BadgeUnlock({ unlock, onClose }) {
  useEffect(() => {
    if (!unlock) return;
    const t = setTimeout(onClose, 6500);
    return () => clearTimeout(t);
  }, [unlock, onClose]);

  if (!unlock) return null;
  const tier = TIERS.find((t) => t.count === unlock.tier_count) || TIERS[0];

  return (
    <div style={{
      position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      zIndex: 130, animation: "scaleIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
    }} data-testid="badge-unlock">
      <div style={{
        background: "var(--bg-elevated)", border: "1px solid var(--border-light)",
        borderRadius: 20, padding: 28, width: 360, textAlign: "center",
        boxShadow: "var(--shadow-xl)",
        position: "relative",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 10, right: 10, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-tertiary)", padding: 4 }} data-testid="badge-unlock-close">
          <X size={16} />
        </button>
        <div style={{
          width: 84, height: 84, borderRadius: "50%",
          background: tier.color, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 14px",
          boxShadow: `0 0 0 8px ${tier.color}33`,
          animation: "avatarActiveGlow 2s ease-in-out infinite",
        }}>
          <Trophy size={36} />
        </div>
        <div style={{ fontSize: 11, color: tier.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>
          Badge unlocked
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4, letterSpacing: "-0.02em" }}>{tier.name}</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.5 }}>
          {unlock.invitee_name} just joined using your invite. You've now welcomed <b>{unlock.joined_total}</b> {unlock.joined_total === 1 ? "person" : "people"} to the table.
        </div>
      </div>
    </div>
  );
}
