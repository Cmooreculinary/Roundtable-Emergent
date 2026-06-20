import React, { useState } from "react";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const serviceHistory = [
  { date: "Mar 12, 2026", service: "Oil Change + Filter", vehicle: "2022 GMC Sierra", cost: "$49.00", status: "completed" },
  { date: "Jan 8, 2026", service: "Brake Pad Replacement (Front)", vehicle: "2022 GMC Sierra", cost: "$210.00", status: "completed" },
  { date: "Nov 14, 2025", service: "Full Diagnostics + Tune-Up", vehicle: "2022 GMC Sierra", cost: "$340.00", status: "completed" },
  { date: "Sep 2, 2025", service: "Tire Rotation + Balancing", vehicle: "2022 GMC Sierra", cost: "$85.00", status: "completed" },
  { date: "Jun 20, 2026", service: "Tire Rotation", vehicle: "2022 GMC Sierra", cost: "$29.00", status: "scheduled" },
];

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "Service History" },
    { id: "vehicles", label: "Vehicles" },
    { id: "notes", label: "AI Notes" },
    { id: "comms", label: "Communications" },
  ];

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Profile header */}
      <GlassCard style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #adc6ff 0%, #4d8eff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: "#002e6a",
              flexShrink: 0,
              boxShadow: "0 0 30px rgba(173,198,255,0.25)",
            }}
          >
            MS
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: "#e5e2e1", margin: 0 }}>
                Marcus Sterling
              </h1>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: "#adc6ff", background: "rgba(173,198,255,0.12)", letterSpacing: 0.5 }}>
                VIP
              </span>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { icon: "phone", val: "(214) 555-0187" },
                { icon: "email", val: "m.sterling@email.com" },
                { icon: "location_on", val: "Dallas, TX 75201" },
                { icon: "calendar_today", val: "Customer since Mar 2021" },
              ].map((info, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#8c909f" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{info.icon}</span>
                  {info.val}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e5e2e1", cursor: "pointer", fontSize: 12 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>phone</span>Call
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#adc6ff", border: "none", borderRadius: 10, color: "#002e6a", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_add_on</span>Schedule
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { label: "Total Spend", value: "$684", sub: "Lifetime", color: "#4ade80" },
            { label: "Visits", value: "9", sub: "Since 2021", color: "#adc6ff" },
            { label: "Loyalty Score", value: "94", sub: "Platinum tier", color: "#facc15" },
            { label: "Next Due", value: "Jun 20", sub: "Tire rotation", color: "#c084fc" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: "#8c909f", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 20, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#8c909f" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 18px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? "#adc6ff" : "transparent"}`,
              color: activeTab === tab.id ? "#adc6ff" : "#8c909f",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 600 : 400,
              transition: "all 0.15s",
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "history" && (
        <GlassCard style={{ padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {serviceHistory.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, borderLeft: `3px solid ${item.status === "scheduled" ? "#adc6ff" : "#4ade80"}` }}>
                <div style={{ width: 90, fontSize: 11, color: "#8c909f", flexShrink: 0 }}>{item.date}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{item.service}</div>
                  <div style={{ fontSize: 11, color: "#8c909f", marginTop: 2 }}>{item.vehicle}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#4ade80", fontFamily: "'Montserrat', sans-serif" }}>{item.cost}</div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, color: item.status === "scheduled" ? "#adc6ff" : "#4ade80", background: item.status === "scheduled" ? "rgba(173,198,255,0.1)" : "rgba(74,222,128,0.1)" }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {activeTab === "vehicles" && (
        <GlassCard style={{ padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {[
              { make: "GMC Sierra", year: 2022, vin: "1GCVKNEC4NZ123456", mileage: "42,310", color: "Onyx Black", health: 94 },
              { make: "Honda CR-V", year: 2019, vin: "2HKRW2H8XKH100789", mileage: "67,800", color: "Lunar Silver", health: 72 },
            ].map((v, i) => (
              <div key={i} style={{ padding: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{v.year} {v.make}</div>
                <div style={{ fontSize: 11, color: "#8c909f", marginBottom: 12 }}>VIN: {v.vin}</div>
                {[["Mileage", v.mileage], ["Color", v.color], ["Health", `${v.health}%`]].map(([k, val]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: "#8c909f" }}>{k}</span>
                    <span style={{ color: "#e5e2e1", fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
                <div style={{ marginTop: 10, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <div style={{ width: `${v.health}%`, height: "100%", background: v.health > 75 ? "#4ade80" : "#facc15", borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {activeTab === "notes" && (
        <GlassCard style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#adc6ff" }}>smart_toy</span>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: 0 }}>Apex Pulse Customer Intelligence</h2>
          </div>
          {[
            { title: "Loyalty Signal", body: "Marcus has visited 9 times in 5 years with an avg spend of $76/visit. High retention probability. Consider proactive outreach for 10th visit reward.", color: "#4ade80" },
            { title: "Upsell Opportunity", body: "Based on Sierra mileage (42K), timing belt service and coolant flush are statistically due. Estimated $340 upsell window.", color: "#facc15" },
            { title: "Communication Preference", body: "Marcus prefers SMS over email. Last 3 confirmations opened via text. Schedule reminders via SMS 48h before appointment.", color: "#adc6ff" },
          ].map((n, i) => (
            <div key={i} style={{ padding: "14px 16px", background: `${n.color}08`, border: `1px solid ${n.color}20`, borderRadius: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: n.color, marginBottom: 6, letterSpacing: 0.5 }}>{n.title}</div>
              <p style={{ margin: 0, fontSize: 12, color: "#cac4d0", lineHeight: 1.5 }}>{n.body}</p>
            </div>
          ))}
        </GlassCard>
      )}

      {activeTab === "comms" && (
        <GlassCard style={{ padding: 20 }}>
          <p style={{ color: "#8c909f", fontSize: 13, textAlign: "center", margin: "30px 0" }}>Communication history · SMS, email, and call logs coming soon.</p>
        </GlassCard>
      )}
    </div>
  );
}
