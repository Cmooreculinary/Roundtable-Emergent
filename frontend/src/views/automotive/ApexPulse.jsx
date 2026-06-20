import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const features = [
  {
    icon: "monitor_heart",
    title: "Predictive Diagnostics",
    desc: "Apex Pulse analyzes 200+ sensor data points per vehicle in real time, predicting failures up to 30 days before they occur. Reduces unplanned downtime by 78%.",
    color: "#adc6ff",
  },
  {
    icon: "inventory_2",
    title: "Smart Inventory AI",
    desc: "Tracks parts consumption velocity and auto-generates purchase orders when PAR levels drop. Integrated with 40+ distributors for real-time pricing.",
    color: "#c084fc",
  },
  {
    icon: "group",
    title: "Customer Intelligence",
    desc: "Builds behavioral profiles for every customer — loyalty signals, upsell windows, preferred communication channels, and churn risk scoring.",
    color: "#4ade80",
  },
  {
    icon: "mic",
    title: "Voice Command Layer",
    desc: "Control the entire platform hands-free. Pull up records, create work orders, check inventory, and send notifications — all by voice.",
    color: "#facc15",
  },
  {
    icon: "show_chart",
    title: "Revenue Intelligence",
    desc: "ROI tracking across every service bay, technician, and vehicle. Identify your highest-margin services and optimize your pricing strategy.",
    color: "#f9a8d4",
  },
  {
    icon: "security",
    title: "Compliance & Safety",
    desc: "Automated tracking of recall bulletins, TSB alerts, and EPA compliance. Never miss a safety-critical update across your entire fleet.",
    color: "#f87171",
  },
];

const stats = [
  { value: "78%", label: "Reduction in unplanned downtime" },
  { value: "3.2x", label: "ROI in first 12 months" },
  { value: "97%", label: "Voice command accuracy" },
  { value: "200+", label: "Sensor points monitored per vehicle" },
];

export default function ApexPulse() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(173,198,255,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 70% 80%, rgba(192,132,252,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 52, maxWidth: 600, margin: "0 auto 52px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(173,198,255,0.08)", border: "1px solid rgba(173,198,255,0.2)", borderRadius: 20, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#adc6ff", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: "#adc6ff", fontWeight: 600, letterSpacing: 1 }}>LIVE INTELLIGENCE ENGINE</span>
        </div>

        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: 42,
            color: "#e5e2e1",
            margin: "0 0 12px",
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Apex Pulse
          <span style={{ display: "block", background: "linear-gradient(135deg, #adc6ff, #4d8eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Live Intelligence
          </span>
        </h1>
        <p style={{ color: "#8c909f", fontSize: 15, lineHeight: 1.6, margin: "0 0 28px" }}>
          The AI brain behind Torque Vision. Real-time diagnostics, predictive maintenance, and business intelligence — unified in one platform.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => navigate("/automotive/fleet")}
            style={{ padding: "12px 28px", background: "#adc6ff", border: "none", borderRadius: 12, color: "#002e6a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}
          >
            Explore Fleet Commander
          </button>
          <button
            onClick={() => navigate("/automotive/voice-calibration")}
            style={{ padding: "12px 28px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#e5e2e1", fontSize: 14, cursor: "pointer" }}
          >
            Set Up Voice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        {stats.map((s, i) => (
          <GlassCard key={i} style={{ padding: 20, textAlign: "center" }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 32, color: "#adc6ff", marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#8c909f", lineHeight: 1.4 }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Features */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, marginBottom: 40 }}>
        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: active === i ? "rgba(173,198,255,0.08)" : "transparent",
                border: `1px solid ${active === i ? "rgba(173,198,255,0.2)" : "transparent"}`,
                borderRadius: 10,
                color: active === i ? "#adc6ff" : "#8c909f",
                cursor: "pointer",
                fontSize: 12,
                textAlign: "left",
                fontWeight: active === i ? 600 : 400,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: active === i ? f.color : "#8c909f", flexShrink: 0 }}>{f.icon}</span>
              {f.title}
            </button>
          ))}
        </div>

        {/* Feature detail */}
        <GlassCard style={{ padding: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: `${features[active].color}15`,
              border: `1px solid ${features[active].color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 28, color: features[active].color }}>{features[active].icon}</span>
          </div>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 22, color: "#e5e2e1", margin: "0 0 12px" }}>
            {features[active].title}
          </h2>
          <p style={{ color: "#cac4d0", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{features[active].desc}</p>
        </GlassCard>
      </div>

      {/* CTA */}
      <GlassCard
        style={{
          padding: 36,
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(173,198,255,0.06) 0%, rgba(77,142,255,0.04) 100%)",
          border: "1px solid rgba(173,198,255,0.15)",
        }}
      >
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: "0 0 10px" }}>
          Ready to activate Apex Pulse?
        </h2>
        <p style={{ color: "#8c909f", fontSize: 13, margin: "0 0 20px" }}>
          Your fleet is already connected. Start your 30-day full-access trial today.
        </p>
        <button
          onClick={() => navigate("/automotive/voice-calibration")}
          style={{ padding: "14px 36px", background: "#adc6ff", border: "none", borderRadius: 12, color: "#002e6a", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}
        >
          Activate Intelligence Engine
        </button>
      </GlassCard>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
