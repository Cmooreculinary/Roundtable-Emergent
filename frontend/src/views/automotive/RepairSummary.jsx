import React from "react";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const workItems = [
  { code: "0W0001", desc: "Engine Oil & Filter Change — 5W-30 Synthetic", tech: "Marcus R.", labor: "0.5 hr", parts: "$42.00", labor_cost: "$35.00" },
  { code: "0W0082", desc: "Front Brake Pad Replacement (OEM Grade)", tech: "Sarah K.", labor: "1.5 hr", parts: "$42.00", labor_cost: "$105.00" },
  { code: "0W0210", desc: "Tire Rotation & Rebalance — All 4", tech: "James L.", labor: "0.5 hr", parts: "$0.00", labor_cost: "$35.00" },
];

const logbook = [
  { date: "Jun 20, 2026", event: "Work order opened · Bay 3 assigned", tech: "Dispatch" },
  { date: "Jun 20, 2026", event: "Oil change completed · 5,318 mi since last", tech: "Marcus R." },
  { date: "Jun 20, 2026", event: "Front brake pads replaced · Left front showing 8% — flagged for follow-up", tech: "Sarah K." },
  { date: "Jun 20, 2026", event: "Tire rotation complete · PSI checked & adjusted to 35 psi all", tech: "James L." },
  { date: "Jun 20, 2026", event: "Vehicle QC check passed · Customer notified via SMS", tech: "Marcus R." },
];

export default function RepairSummary() {
  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
            Post-Repair Summary
          </h1>
          <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>Work Order #WO-2026-08841 · Jun 20, 2026</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e5e2e1", cursor: "pointer", fontSize: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>print</span>Print
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#adc6ff", border: "none", borderRadius: 10, color: "#002e6a", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>Email to Customer
          </button>
        </div>
      </div>

      {/* Vehicle + customer info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <GlassCard style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: "#8c909f", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Vehicle Information</div>
          {[
            ["Unit ID", "GMC-7729"],
            ["Year / Make / Model", "2022 GMC Sierra 1500 SLT"],
            ["VIN", "1GCVKNEC4NZ123456"],
            ["Mileage In / Out", "42,310 / 42,312"],
            ["Color", "Onyx Black"],
            ["License Plate", "TX · JKL-4421"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12 }}>
              <span style={{ color: "#8c909f" }}>{k}</span>
              <span style={{ color: "#e5e2e1", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </GlassCard>

        <GlassCard style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: "#8c909f", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Customer & Authorization</div>
          {[
            ["Customer", "Marcus Sterling"],
            ["Phone", "(214) 555-0187"],
            ["Email", "m.sterling@email.com"],
            ["Auth #", "AUTH-2026-88123"],
            ["Authorized By", "Marcus Sterling (SMS)"],
            ["Deductible / PO", "N/A · Net 30"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12 }}>
              <span style={{ color: "#8c909f" }}>{k}</span>
              <span style={{ color: "#e5e2e1", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          {/* Work summary */}
          <GlassCard style={{ padding: 20, marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>Work Performed</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", gap: 10, padding: "6px 10px", marginBottom: 6 }}>
              {["Description", "Labor", "Parts", "Labor $"].map((h) => (
                <div key={h} style={{ fontSize: 10, color: "#8c909f", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</div>
              ))}
            </div>
            {workItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 80px 80px",
                  gap: 10,
                  padding: "12px 10px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  marginBottom: 6,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{item.desc}</div>
                  <div style={{ fontSize: 11, color: "#8c909f", marginTop: 2 }}>{item.code} · {item.tech}</div>
                </div>
                <div style={{ fontSize: 12, color: "#cac4d0" }}>{item.labor}</div>
                <div style={{ fontSize: 12, color: "#cac4d0" }}>{item.parts}</div>
                <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>{item.labor_cost}</div>
              </div>
            ))}
          </GlassCard>

          {/* Digital logbook */}
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>Digital Logbook</h2>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 1, background: "rgba(173,198,255,0.1)" }} />
              {logbook.map((entry, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 4, width: 14, height: 14, borderRadius: "50%", background: "#131313", border: "2px solid rgba(173,198,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#adc6ff" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 12, color: "#e5e2e1", lineHeight: 1.4 }}>{entry.event}</div>
                    <div style={{ fontSize: 10, color: "#8c909f", marginTop: 3 }}>{entry.date} · {entry.tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Invoice summary */}
        <div>
          <GlassCard style={{ padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 16px" }}>Invoice Summary</h2>
            {[
              ["Parts Total", "$84.00"],
              ["Labor Total", "$175.00"],
              ["Sublet / Misc", "$0.00"],
              ["Subtotal", "$259.00"],
              ["Tax (8.25%)", "$21.37"],
              ["Discount", "-$25.00"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                <span style={{ color: "#8c909f" }}>{k}</span>
                <span style={{ color: v.startsWith("-") ? "#4ade80" : "#e5e2e1", fontWeight: v.startsWith("-") ? 600 : 400 }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Total Due</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 20, color: "#adc6ff" }}>$255.37</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: "#4ade80", textAlign: "right" }}>✓ Paid via Net 30</div>
          </GlassCard>

          {/* AI next service */}
          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#adc6ff" }}>smart_toy</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, margin: 0 }}>AI Recommendations</h2>
            </div>
            {[
              { desc: "Left front brake pad at 8% — schedule replacement in 30–45 days.", urgency: "#facc15" },
              { desc: "Coolant flush due at 45,000 miles (~2,700 miles away).", urgency: "#adc6ff" },
              { desc: "Cabin air filter replacement recommended at next visit.", urgency: "#adc6ff" },
            ].map((rec, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: rec.urgency, flexShrink: 0, marginTop: 1 }}>arrow_forward</span>
                <p style={{ margin: 0, fontSize: 12, color: "#cac4d0", lineHeight: 1.4 }}>{rec.desc}</p>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
