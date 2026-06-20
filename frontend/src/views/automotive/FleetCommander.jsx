import React, { useState } from "react";

const vehicles = [
  { id: "GMC-7729", make: "GMC Sierra", year: 2022, status: "active", health: 94, mileage: "42,310", bay: "Bay 3", alert: null },
  { id: "F150-2241", make: "Ford F-150", year: 2021, status: "maintenance", health: 61, mileage: "78,440", bay: "Bay 1", alert: "Oil overdue" },
  { id: "RAM-5592", make: "Ram 1500", year: 2023, status: "active", health: 88, mileage: "19,800", bay: null, alert: null },
  { id: "CRV-3310", make: "Honda CR-V", year: 2020, status: "critical", health: 34, mileage: "101,220", bay: "Bay 2", alert: "Engine fault" },
  { id: "CAM-1187", make: "Toyota Camry", year: 2022, status: "active", health: 97, mileage: "31,005", bay: null, alert: null },
  { id: "CTI-8831", make: "Cadillac CT5", year: 2023, status: "active", health: 82, mileage: "14,500", bay: null, alert: null },
];

const timeline = [
  { time: "08:00", vehicle: "F150-2241", task: "Oil change + filter", tech: "Marcus R.", status: "in-progress" },
  { time: "10:30", vehicle: "CRV-3310", task: "Engine diagnostics", tech: "Sarah K.", status: "pending" },
  { time: "13:00", vehicle: "GMC-7729", task: "Tire rotation", tech: "James L.", status: "pending" },
  { time: "15:30", vehicle: "RAM-5592", task: "Brake inspection", tech: "Marcus R.", status: "scheduled" },
];

const statusColor = { active: "#4ade80", maintenance: "#facc15", critical: "#f87171", scheduled: "#adc6ff" };
const statusBg = { active: "rgba(74,222,128,0.1)", maintenance: "rgba(250,204,21,0.1)", critical: "rgba(248,113,113,0.1)", scheduled: "rgba(173,198,255,0.1)" };

function GlassCard({ children, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        backdropFilter: "blur(20px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ icon, label, value, sub, color = "#adc6ff" }) {
  return (
    <GlassCard style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "#8c909f", marginBottom: 6, fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color, lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: "#8c909f", marginTop: 4 }}>{sub}</div>}
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20, color }}>{icon}</span>
        </div>
      </div>
    </GlassCard>
  );
}

function HealthBar({ value }) {
  const color = value > 75 ? "#4ade80" : value > 40 ? "#facc15" : "#f87171";
  return (
    <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.3s" }} />
    </div>
  );
}

export default function FleetCommander() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "#e5e2e1",
                margin: 0,
                letterSpacing: -0.5,
              }}
            >
              Fleet Commander
            </h1>
            <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>
              Real-time fleet intelligence — Friday, June 20, 2026
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: "#e5e2e1",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>tune</span>
              Filters
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: "#adc6ff",
                border: "none",
                borderRadius: 10,
                color: "#002e6a",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
              Add Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon="directions_car" label="Total Vehicles" value="6" sub="3 active · 1 critical" color="#adc6ff" />
        <StatCard icon="build" label="In Service" value="2" sub="Bay 1 & 2 occupied" color="#facc15" />
        <StatCard icon="trending_up" label="Fleet Health" value="76%" sub="+4% vs last week" color="#4ade80" />
        <StatCard icon="attach_money" label="Monthly ROI" value="$48.2K" sub="↑ 12% MoM" color="#adc6ff" />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Vehicle grid */}
        <div>
          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: 0 }}>
                Vehicle Status Grid
              </h2>
              <span style={{ fontSize: 12, color: "#8c909f" }}>{vehicles.length} vehicles</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v.id === selectedVehicle ? null : v.id)}
                  style={{
                    padding: 14,
                    background: selectedVehicle === v.id ? "rgba(173,198,255,0.08)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${selectedVehicle === v.id ? "rgba(173,198,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{v.make}</div>
                      <div style={{ fontSize: 11, color: "#8c909f" }}>{v.year} · {v.id}</div>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 20,
                        color: statusColor[v.status],
                        background: statusBg[v.status],
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {v.status}
                    </span>
                  </div>
                  <HealthBar value={v.health} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#8c909f" }}>
                    <span>{v.health}% health</span>
                    <span>{v.mileage} mi</span>
                  </div>
                  {v.alert && (
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        color: "#f87171",
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>warning</span>
                      {v.alert}
                    </div>
                  )}
                  {v.bay && (
                    <div style={{ marginTop: 6, fontSize: 11, color: "#facc15", display: "flex", alignItems: "center", gap: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>build</span>
                      {v.bay}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Maintenance timeline */}
          <GlassCard style={{ padding: 20, marginTop: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>
              Today's Maintenance Timeline
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {timeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                  }}
                >
                  <div style={{ width: 52, fontSize: 13, fontWeight: 600, color: "#adc6ff", flexShrink: 0 }}>
                    {item.time}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{item.task}</div>
                    <div style={{ fontSize: 11, color: "#8c909f", marginTop: 2 }}>
                      {item.vehicle} · {item.tech}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 20,
                      color: statusColor[item.status] || "#8c909f",
                      background: statusBg[item.status] || "rgba(255,255,255,0.06)",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* ROI Tracker */}
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 16px" }}>
              ROI Tracker
            </h2>
            {[
              { label: "Preventive Maint.", saved: "$12,400", pct: 78 },
              { label: "Fuel Efficiency", saved: "$8,200", pct: 62 },
              { label: "Downtime Avoided", saved: "$18,600", pct: 91 },
              { label: "Parts Optimization", saved: "$9,000", pct: 55 },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                  <span style={{ color: "#cac4d0" }}>{r.label}</span>
                  <span style={{ color: "#4ade80", fontWeight: 600 }}>{r.saved}</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <div
                    style={{
                      width: `${r.pct}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #adc6ff, #4d8eff)",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: "#cac4d0" }}>Total AI Savings</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: "#4ade80", fontFamily: "'Montserrat', sans-serif" }}>
                $48,200
              </span>
            </div>
          </GlassCard>

          {/* AI Insights */}
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>
              Apex Pulse Insights
            </h2>
            {[
              { icon: "warning", msg: "CRV-3310 engine fault detected. Schedule immediate inspection.", color: "#f87171", priority: "HIGH" },
              { icon: "info", msg: "F150-2241 oil change overdue by 1,200 miles. In service now.", color: "#facc15", priority: "MED" },
              { icon: "bolt", msg: "RAM-5592 brake pads at 22% — recommend replacement in 60 days.", color: "#adc6ff", priority: "LOW" },
            ].map((ins, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 12px",
                  background: `${ins.color}0a`,
                  border: `1px solid ${ins.color}20`,
                  borderRadius: 10,
                  marginBottom: 8,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: ins.color, flexShrink: 0, marginTop: 1 }}>
                  {ins.icon}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: ins.color, fontWeight: 700, marginBottom: 2, letterSpacing: 0.5 }}>
                    {ins.priority}
                  </div>
                  <div style={{ fontSize: 12, color: "#cac4d0", lineHeight: 1.4 }}>{ins.msg}</div>
                </div>
              </div>
            ))}
          </GlassCard>

          {/* 3D Torque Core placeholder */}
          <GlassCard style={{ padding: 20, textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 12px", textAlign: "left" }}>
              Torque Core Viz
            </h2>
            <div
              style={{
                height: 160,
                background: "radial-gradient(ellipse at center, rgba(173,198,255,0.12) 0%, rgba(77,142,255,0.04) 60%, transparent 100%)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(173,198,255,0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(173,198,255,0.3) 0%, rgba(77,142,255,0.1) 70%)",
                  border: "2px solid rgba(173,198,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "spin 8s linear infinite",
                  boxShadow: "0 0 40px rgba(173,198,255,0.2)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 36, color: "#adc6ff" }}>settings</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 30% 70%, rgba(255,180,171,0.05) 0%, transparent 60%)",
                }}
              />
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#8c909f" }}>
              Fleet avg torque · 6 engines monitored
            </div>
          </GlassCard>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
