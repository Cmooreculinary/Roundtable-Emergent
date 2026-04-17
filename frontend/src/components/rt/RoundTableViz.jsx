import React from "react";
import { FileText, Image, Video, Music, Link2, StickyNote, Sheet, Presentation, Armchair } from "lucide-react";

const ITEM_ICONS = {
  photo: <Image size={20} />,
  document: <FileText size={20} />,
  video: <Video size={20} />,
  audio: <Music size={20} />,
  link: <Link2 size={20} />,
  note: <StickyNote size={20} />,
  spreadsheet: <Sheet size={20} />,
  presentation: <Presentation size={20} />,
};

const TYPE_COLOR = {
  photo: "#34C759",
  document: "#007AFF",
  video: "#FF3B30",
  audio: "#AF52DE",
  link: "#5AC8FA",
  note: "#FFCC00",
  spreadsheet: "#FF9500",
  presentation: "#FF2D55",
};

// Radial position helper
function positionOnCircle(index, total, radius, centerSize) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const x = Math.cos(angle) * radius + centerSize / 2;
  const y = Math.sin(angle) * radius + centerSize / 2;
  return { x, y };
}

export default function RoundTableViz({ table, onMemberClick }) {
  const live = !!table?.active;
  const members = table?.members || [];
  const items = table?.items || [];

  const tableSize = 440;
  const memberRadius = tableSize / 2 + 24; // outside the table edge
  const itemRadius = tableSize * 0.3; // on the table surface

  return (
    <div className="rt-stage" data-testid="rt-stage">
      <div style={{ position: "relative", width: tableSize, height: tableSize }}>
        {live && <div className="rt-glow-ring" />}
        <div className={`rt-table ${live ? "live" : "dormant"}`} data-testid="rt-table">
          <div className="rt-inner-ring" />
          {live && <div className="rt-shimmer" />}
          <div style={{ color: "rgba(255,255,255,0.85)", textAlign: "center" }}>
            <Armchair size={36} style={{ opacity: 0.7 }} />
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 6, letterSpacing: "-0.01em" }}>{table?.name}</div>
            <div style={{ fontSize: 10, opacity: 0.7, marginTop: 3 }}>{members.length} member{members.length !== 1 ? "s" : ""}</div>
          </div>

          <div className={`rt-status-banner ${live ? "" : "dormant"}`}>
            <span className="banner-dot" />
            {live ? "LIVE" : "DORMANT"}
          </div>

          {/* Items on table surface */}
          {items.slice(0, 8).map((it, i) => {
            const p = positionOnCircle(i, Math.max(items.slice(0, 8).length, 3), itemRadius, tableSize);
            return (
              <div
                key={it.id}
                className="rt-item"
                style={{
                  left: p.x, top: p.y, transform: "translate(-50%, -50%)",
                  color: TYPE_COLOR[it.type] || "#007AFF",
                }}
                title={it.name}
              >
                {ITEM_ICONS[it.type] || <FileText size={20} />}
              </div>
            );
          })}
        </div>

        {/* Members around the table */}
        {members.map((m, i) => {
          const p = positionOnCircle(i, Math.max(members.length, 1), memberRadius, tableSize);
          const isActive = m.status === "online" && live;
          return (
            <div
              key={m.id}
              className={`rt-seat ${isActive ? "active" : ""}`}
              style={{
                left: p.x - 28, top: p.y - 28,
                background: m.color || "#007AFF",
              }}
              onClick={() => onMemberClick?.(m)}
              title={m.name}
              data-testid={`rt-seat-${m.id}`}
            >
              {m.initials}
              <span className={`rt-seat-status ${m.status}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
