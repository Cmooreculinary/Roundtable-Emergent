import React, { useState } from "react";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const leads = [
  { name: "Sandra Kim", vehicle: "2024 BMW X5", value: "$72,400", stage: "Quote Sent", avatar: "SK", heat: 92 },
  { name: "Devon Carter", vehicle: "2023 Tesla Model Y", value: "$54,900", stage: "Negotiating", avatar: "DC", heat: 78 },
  { name: "Maria Ortega", vehicle: "2022 Ford Mustang", value: "$41,200", stage: "New Lead", avatar: "MO", heat: 45 },
  { name: "Tom Bradley", vehicle: "2024 Chevy Silverado", value: "$68,700", stage: "Follow-Up", avatar: "TB", heat: 61 },
  { name: "Asha Patel", vehicle: "2023 Honda Pilot", value: "$38,500", stage: "Closed Won", avatar: "AP", heat: 100 },
];

const stageColor = {
  "New Lead": "#8c909f",
  "Quote Sent": "#adc6ff",
  "Negotiating": "#facc15",
  "Follow-Up": "#c084fc",
  "Closed Won": "#4ade80",
};

const analytics = [
  { label: "Leads This Month", value: "142", change: "+18%", icon: "group_add", color: "#adc6ff" },
  { label: "Conversion Rate", value: "34%", change: "+5%", icon: "trending_up", color: "#4ade80" },
  { label: "Avg Deal Size", value: "$52.1K", change: "+$3.2K", icon: "attach_money", color: "#facc15" },
  { label: "Pipeline Value", value: "$1.2M", change: "↑ active", icon: "show_chart", color: "#f9a8d4" },
];

const kb = [
  { title: "2024 Recall Bulletin — Ford F-150 Cam Phaser", tag: "Recall", date: "Jun 18" },
  { title: "GM Technical Service: Transmission Shudder Fix", tag: "TSB", date: "Jun 15" },
  { title: "Toyota Hybrid Battery Warranty Extension Policy", tag: "Policy", date: "Jun 10" },
  { title: "EPA Emissions Compliance — 2025 Model Year", tag: "Compliance", date: "Jun 8" },
];

const tagColor = { Recall: "#f87171", TSB: "#facc15", Policy: "#adc6ff", Compliance: "#4ade80" };

export default function AdminControl() {
  const [activeStage, setActiveStage] = useState("All");

  const stages = ["All", "New Lead", "Quote Sent", "Negotiating", "Follow-Up", "Closed Won"];
  const filtered = activeStage === "All" ? leads : leads.filter((l) => l.stage === activeStage);

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
          Admin Control Center
        </h1>
        <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>Pipeline intelligence · Knowledge base · Analytics</p>
      </div>

      {/* Analytics bento */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {analytics.map((a, i) => (
          <GlassCard key={i} style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: "#8c909f", fontWeight: 500 }}>{a.label}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: a.color }}>{a.icon}</span>
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 24, color: a.color }}>{a.value}</div>
            <div style={{ fontSize: 11, color: "#4ade80", marginTop: 4 }}>{a.change}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Lead Pipeline */}
        <GlassCard style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: 0 }}>Lead Pipeline</h2>
            <button style={{ padding: "6px 14px", background: "#adc6ff", border: "none", borderRadius: 8, color: "#002e6a", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              + Add Lead
            </button>
          </div>

          {/* Stage filter */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {stages.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStage(s)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1px solid ${activeStage === s ? "rgba(173,198,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                  background: activeStage === s ? "rgba(173,198,255,0.1)" : "transparent",
                  color: activeStage === s ? "#adc6ff" : "#8c909f",
                  fontSize: 11,
                  cursor: "pointer",
                  fontWeight: activeStage === s ? 600 : 400,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((lead, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4d8eff, #adc6ff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#002e6a",
                    flexShrink: 0,
                  }}
                >
                  {lead.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{lead.name}</div>
                  <div style={{ fontSize: 11, color: "#8c909f", marginTop: 2 }}>{lead.vehicle}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#4ade80", fontFamily: "'Montserrat', sans-serif" }}>{lead.value}</div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 20,
                      color: stageColor[lead.stage] || "#8c909f",
                      background: `${stageColor[lead.stage]}18` || "rgba(255,255,255,0.06)",
                      fontWeight: 600,
                    }}
                  >
                    {lead.stage}
                  </span>
                </div>
                {/* Heat score */}
                <div style={{ width: 36, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: lead.heat > 80 ? "#f87171" : lead.heat > 60 ? "#facc15" : "#8c909f" }}>
                    {lead.heat}
                  </div>
                  <div style={{ fontSize: 9, color: "#8c909f" }}>HEAT</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Knowledge Base */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>
              Knowledge Base
            </h2>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#8c909f" }}>search</span>
              <input
                placeholder="Search bulletins, TSBs..."
                style={{
                  width: "100%",
                  padding: "8px 10px 8px 34px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  color: "#e5e2e1",
                  fontSize: 12,
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {kb.map((doc, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 12px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: 4,
                        color: tagColor[doc.tag],
                        background: `${tagColor[doc.tag]}18`,
                        letterSpacing: 0.5,
                      }}
                    >
                      {doc.tag}
                    </span>
                    <span style={{ fontSize: 10, color: "#8c909f" }}>{doc.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#cac4d0", lineHeight: 1.4 }}>{doc.title}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 12px" }}>
              Quick Actions
            </h2>
            {[
              { icon: "send", label: "Send Fleet Report", color: "#adc6ff" },
              { icon: "event", label: "Schedule All-Hands", color: "#c084fc" },
              { icon: "notifications", label: "Broadcast Alert", color: "#f87171" },
              { icon: "download", label: "Export Analytics", color: "#4ade80" },
            ].map((a, i) => (
              <button
                key={i}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  color: "#cac4d0",
                  cursor: "pointer",
                  fontSize: 12,
                  marginBottom: 6,
                  textAlign: "left",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: a.color }}>{a.icon}</span>
                {a.label}
              </button>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
