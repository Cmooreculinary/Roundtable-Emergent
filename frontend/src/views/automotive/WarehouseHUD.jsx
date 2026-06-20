import React, { useState } from "react";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const pickList = [
  { id: "PK-001", sku: "OIL-5W30-QT", name: "Synthetic Motor Oil 5W-30", bin: "A-14-3", qty: 5, qtyPicked: 5, status: "picked" },
  { id: "PK-002", sku: "BRK-PAD-F1", name: "Front Brake Pad Set", bin: "C-02-1", qty: 1, qtyPicked: 1, status: "picked" },
  { id: "PK-003", sku: "SPARK-IRID-4", name: "Iridium Spark Plug Set (4)", bin: "B-07-2", qty: 1, qtyPicked: 0, status: "pending" },
  { id: "PK-004", sku: "AIR-FILT-K1", name: "K&N Air Filter", bin: "A-22-1", qty: 1, qtyPicked: 0, status: "not-found" },
  { id: "PK-005", sku: "BELT-SERP-76", name: "Serpentine Belt 76.5in", bin: "D-11-4", qty: 1, qtyPicked: 0, status: "pending" },
];

const statusConfig = {
  picked: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", label: "Picked", icon: "check_circle" },
  pending: { color: "#adc6ff", bg: "rgba(173,198,255,0.08)", label: "Pending", icon: "radio_button_unchecked" },
  "not-found": { color: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Not Found", icon: "cancel" },
};

const binMap = [
  { id: "A", label: "Aisle A — Fluids & Filters", items: 42, status: "ok" },
  { id: "B", label: "Aisle B — Engine Components", items: 38, status: "ok" },
  { id: "C", label: "Aisle C — Brakes & Suspension", items: 61, status: "low" },
  { id: "D", label: "Aisle D — Belts, Hoses & Misc.", items: 29, status: "ok" },
];

export default function WarehouseHUD() {
  const [items, setItems] = useState(pickList);
  const [activeAisle, setActiveAisle] = useState("A");

  const markPicked = (id) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, qtyPicked: item.qty, status: "picked" } : item));
  };

  const markNotFound = (id) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, status: "not-found" } : item));
  };

  const picked = items.filter((i) => i.status === "picked").length;
  const total = items.length;

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
            Warehouse HUD
          </h1>
          <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>Pick & Pack · Order #BSA-2026-04821 · Unit GMC-7729</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 28, color: picked === total ? "#4ade80" : "#adc6ff" }}>
            {picked}/{total}
          </div>
          <div style={{ fontSize: 11, color: "#8c909f" }}>items picked</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 24, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${(picked / total) * 100}%`,
            background: picked === total ? "#4ade80" : "linear-gradient(90deg, #adc6ff, #4d8eff)",
            borderRadius: 3,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        {/* Pick list */}
        <GlassCard style={{ padding: 20 }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>Pick List</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item) => {
              const sc = statusConfig[item.status];
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    background: `${sc.bg}`,
                    border: `1px solid ${sc.color}20`,
                    borderRadius: 12,
                    borderLeft: `3px solid ${sc.color}`,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: sc.color, flexShrink: 0 }}>{sc.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                    <div style={{ display: "flex", gap: 12, marginTop: 3 }}>
                      <span style={{ fontSize: 11, color: "#8c909f" }}>SKU: {item.sku}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#adc6ff" }}>Bin: {item.bin}</span>
                      <span style={{ fontSize: 11, color: "#8c909f" }}>Qty: {item.qty}</span>
                    </div>
                  </div>
                  {item.status === "pending" && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => markPicked(item.id)}
                        style={{ padding: "6px 12px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, color: "#4ade80", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
                      >
                        Pick
                      </button>
                      <button
                        onClick={() => markNotFound(item.id)}
                        style={{ padding: "6px 12px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 8, color: "#f87171", cursor: "pointer", fontSize: 11 }}
                      >
                        Not Found
                      </button>
                    </div>
                  )}
                  {item.status !== "pending" && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: sc.color, background: `${sc.color}15`, letterSpacing: 0.5 }}>
                      {sc.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {picked === total && (
            <div style={{ marginTop: 16, padding: "14px 16px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#4ade80" }}>task_alt</span>
              <div>
                <div style={{ fontWeight: 600, color: "#4ade80", fontSize: 13 }}>All items picked!</div>
                <div style={{ fontSize: 11, color: "#8c909f" }}>Ready to pack and dispatch.</div>
              </div>
              <button style={{ marginLeft: "auto", padding: "8px 16px", background: "#4ade80", border: "none", borderRadius: 8, color: "#052e16", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                Pack Order
              </button>
            </div>
          )}
        </GlassCard>

        {/* Warehouse map + stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>Warehouse Map</h2>
            {binMap.map((aisle) => (
              <div
                key={aisle.id}
                onClick={() => setActiveAisle(aisle.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  background: activeAisle === aisle.id ? "rgba(173,198,255,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeAisle === aisle.id ? "rgba(173,198,255,0.25)" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  marginBottom: 6,
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: activeAisle === aisle.id ? "rgba(173,198,255,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${activeAisle === aisle.id ? "rgba(173,198,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    fontSize: 14,
                    color: activeAisle === aisle.id ? "#adc6ff" : "#8c909f",
                    flexShrink: 0,
                  }}
                >
                  {aisle.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "#cac4d0" }}>{aisle.label}</div>
                  <div style={{ fontSize: 10, color: "#8c909f", marginTop: 1 }}>{aisle.items} items</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: aisle.status === "ok" ? "#4ade80" : "#facc15" }} />
              </div>
            ))}
          </GlassCard>

          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, margin: "0 0 12px" }}>Session Stats</h2>
            {[
              ["Orders Today", "12"],
              ["Items Picked", "84"],
              ["Avg Pick Time", "1m 42s"],
              ["Accuracy Rate", "99.1%"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12 }}>
                <span style={{ color: "#8c909f" }}>{k}</span>
                <span style={{ color: "#e5e2e1", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
