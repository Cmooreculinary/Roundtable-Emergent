import React, { useState } from "react";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const parts = [
  { sku: "OIL-5W30-QT", name: "Synthetic Motor Oil 5W-30", category: "Fluids", stock: 124, reorder: 50, unit: "qt", cost: "$8.40", status: "ok" },
  { sku: "BRK-PAD-F1", name: "Front Brake Pad Set — Universal", category: "Brakes", stock: 8, reorder: 20, unit: "set", cost: "$42.00", status: "low" },
  { sku: "AIR-FILT-K1", name: "Air Filter — High-Flow K&N", category: "Filters", stock: 0, reorder: 15, unit: "ea", cost: "$28.50", status: "out" },
  { sku: "STRUT-FR-GM", name: "Front Strut Assembly — GM", category: "Suspension", stock: 4, reorder: 8, unit: "ea", cost: "$186.00", status: "low" },
  { sku: "BELT-SERP-76", name: "Serpentine Belt 76.5in", category: "Engine", stock: 22, reorder: 10, unit: "ea", cost: "$18.90", status: "ok" },
  { sku: "SPARK-IRID-4", name: "Iridium Spark Plug — Set of 4", category: "Engine", stock: 36, reorder: 20, unit: "set", cost: "$34.00", status: "ok" },
  { sku: "TRANS-FLD-D6", name: "ATF Dexron VI Fluid", category: "Fluids", stock: 3, reorder: 24, unit: "qt", cost: "$11.20", status: "low" },
  { sku: "RAD-CAP-16", name: "Radiator Cap 16 PSI", category: "Cooling", stock: 14, reorder: 8, unit: "ea", cost: "$6.50", status: "ok" },
];

const statusConfig = {
  ok: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", label: "In Stock" },
  low: { color: "#facc15", bg: "rgba(250,204,21,0.1)", label: "Low Stock" },
  out: { color: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Out of Stock" },
};

const aiPulse = [
  { msg: "BRK-PAD-F1 predicted to deplete in 3 days based on current service velocity.", urgency: "high" },
  { msg: "TRANS-FLD-D6 stock critically low — 2 scheduled jobs need this part next week.", urgency: "high" },
  { msg: "AIR-FILT-K1 is out. Reorder from preferred supplier (ETA: 2 days).", urgency: "medium" },
  { msg: "STRUT-FR-GM demand up 40% this month. Consider increasing PAR level to 12.", urgency: "low" },
];

export default function AdminInventory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const cats = ["All", "Fluids", "Brakes", "Filters", "Engine", "Suspension", "Cooling"];
  const filtered = parts.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
          Admin Inventory Dashboard
        </h1>
        <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>Parts tracking · AI restock pulse · Supply chain intelligence</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total SKUs", value: parts.length, icon: "inventory", color: "#adc6ff" },
          { label: "Low Stock", value: parts.filter((p) => p.status === "low").length, icon: "warning", color: "#facc15" },
          { label: "Out of Stock", value: parts.filter((p) => p.status === "out").length, icon: "remove_shopping_cart", color: "#f87171" },
          { label: "Inventory Value", value: "$24.8K", icon: "account_balance", color: "#4ade80" },
        ].map((s, i) => (
          <GlassCard key={i} style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: "#8c909f", fontWeight: 500 }}>{s.label}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, color: s.color }}>{s.value}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Parts table */}
        <GlassCard style={{ padding: 20 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#8c909f" }}>search</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search parts, SKUs..."
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
            <button style={{ padding: "8px 14px", background: "#adc6ff", border: "none", borderRadius: 8, color: "#002e6a", fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
              + Add Part
            </button>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  border: `1px solid ${filter === c ? "rgba(173,198,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                  background: filter === c ? "rgba(173,198,255,0.1)" : "transparent",
                  color: filter === c ? "#adc6ff" : "#8c909f",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 70px 90px", gap: 10, padding: "6px 10px", marginBottom: 6 }}>
            {["Part", "Stock", "Reorder", "Unit Cost", "Status"].map((h) => (
              <div key={h} style={{ fontSize: 10, color: "#8c909f", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filtered.map((p, i) => {
              const sc = statusConfig[p.status];
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px 80px 70px 90px",
                    gap: 10,
                    padding: "10px 10px",
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${p.status === "out" ? "rgba(248,113,113,0.15)" : "rgba(255,255,255,0.05)"}`,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 12 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: "#8c909f", marginTop: 2 }}>{p.sku} · {p.category}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: p.status === "ok" ? "#e5e2e1" : sc.color }}>{p.stock}</div>
                  <div style={{ fontSize: 12, color: "#8c909f" }}>{p.reorder}</div>
                  <div style={{ fontSize: 12, color: "#cac4d0" }}>{p.cost}</div>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20, color: sc.color, background: sc.bg, whiteSpace: "nowrap" }}>
                    {sc.label}
                  </span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* AI Restock Pulse */}
        <div>
          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#adc6ff", boxShadow: "0 0 8px #adc6ff", animation: "pulse 2s infinite" }} />
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: 0 }}>AI Restock Pulse</h2>
            </div>

            {aiPulse.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 12px",
                  background: item.urgency === "high" ? "rgba(248,113,113,0.07)" : item.urgency === "medium" ? "rgba(250,204,21,0.07)" : "rgba(173,198,255,0.05)",
                  border: `1px solid ${item.urgency === "high" ? "rgba(248,113,113,0.2)" : item.urgency === "medium" ? "rgba(250,204,21,0.2)" : "rgba(173,198,255,0.1)"}`,
                  borderRadius: 10,
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: item.urgency === "high" ? "#f87171" : item.urgency === "medium" ? "#facc15" : "#adc6ff" }}>
                    {item.urgency === "high" ? "priority_high" : item.urgency === "medium" ? "warning" : "info"}
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: item.urgency === "high" ? "#f87171" : item.urgency === "medium" ? "#facc15" : "#adc6ff", textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {item.urgency}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "#cac4d0", lineHeight: 1.4 }}>{item.msg}</p>
                <button style={{ marginTop: 8, padding: "4px 10px", background: "rgba(173,198,255,0.1)", border: "1px solid rgba(173,198,255,0.2)", borderRadius: 6, color: "#adc6ff", fontSize: 11, cursor: "pointer" }}>
                  Reorder Now
                </button>
              </div>
            ))}
          </GlassCard>

          <GlassCard style={{ padding: 20, marginTop: 16 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 12px" }}>Supplier Contacts</h2>
            {[
              { name: "AutoZone Commercial", rep: "Jake Morton", status: "online" },
              { name: "NAPA Distribution", rep: "Lynn Chavez", status: "online" },
              { name: "O'Reilly Pro", rep: "Sam Winters", status: "offline" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.status === "online" ? "#4ade80" : "#8c909f", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: "#8c909f" }}>{s.rep}</div>
                </div>
                <button style={{ padding: "4px 8px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#8c909f", fontSize: 10, cursor: "pointer" }}>
                  Contact
                </button>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
