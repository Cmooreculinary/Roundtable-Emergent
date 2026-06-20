import React, { useState } from "react";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const services = [
  { id: "oil", icon: "water_drop", label: "Oil Change", duration: "45 min", price: "$49" },
  { id: "tire", icon: "tire_repair", label: "Tire Rotation", duration: "30 min", price: "$29" },
  { id: "brake", icon: "emergency_heat", label: "Brake Service", duration: "90 min", price: "$189" },
  { id: "diag", icon: "monitor_heart", label: "Diagnostics", duration: "60 min", price: "$99" },
  { id: "ac", icon: "ac_unit", label: "A/C Service", duration: "75 min", price: "$129" },
  { id: "align", icon: "straighten", label: "Wheel Alignment", duration: "60 min", price: "$89" },
];

const appointments = [
  { time: "09:00", name: "Janet Rivera", vehicle: "2021 Honda Accord", service: "Oil Change", tech: "Marcus R.", confirmed: true },
  { time: "10:00", name: "Terrell Washington", vehicle: "2020 Dodge Charger", service: "Brake Service", tech: "Sarah K.", confirmed: true },
  { time: "11:30", name: "Lisa Chen", vehicle: "2023 BMW 3 Series", service: "Diagnostics", tech: "James L.", confirmed: false },
  { time: "13:00", name: "Marcus Sterling", vehicle: "2022 GMC Sierra", service: "Tire Rotation", tech: "Marcus R.", confirmed: true },
  { time: "14:30", name: "Open Slot", vehicle: "—", service: "—", tech: "—", confirmed: null },
  { time: "16:00", name: "Open Slot", vehicle: "—", service: "—", tech: "—", confirmed: null },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = [16, 17, 18, 19, 20, 21];

export default function ServiceScheduling() {
  const [selectedDay, setSelectedDay] = useState(4); // Friday (index 4 = 20)
  const [selectedServices, setSelectedServices] = useState([]);
  const [step, setStep] = useState(1);

  const toggleService = (id) => {
    setSelectedServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
          Service Scheduling Assistant
        </h1>
        <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>AI-powered appointment booking · Bay availability · Technician assignment</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        {/* Calendar + Booking */}
        <div>
          {/* Calendar */}
          <GlassCard style={{ padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: 0 }}>June 2026</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "4px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#8c909f", cursor: "pointer", fontSize: 12 }}>‹</button>
                <button style={{ padding: "4px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#8c909f", cursor: "pointer", fontSize: 12 }}>›</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
              {days.map((d, i) => (
                <div
                  key={d}
                  onClick={() => setSelectedDay(i)}
                  style={{
                    textAlign: "center",
                    padding: "12px 8px",
                    borderRadius: 12,
                    cursor: "pointer",
                    background: selectedDay === i ? "#adc6ff" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selectedDay === i ? "#adc6ff" : "rgba(255,255,255,0.07)"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: 10, color: selectedDay === i ? "#002e6a" : "#8c909f", fontWeight: 600, marginBottom: 4 }}>{d}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color: selectedDay === i ? "#002e6a" : "#e5e2e1" }}>{dates[i]}</div>
                  {i === 4 && (
                    <div style={{ marginTop: 4, display: "flex", justifyContent: "center", gap: 2 }}>
                      {[1, 2, 3].map((d) => (
                        <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: selectedDay === i ? "#002e6a80" : "#adc6ff80" }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Day appointments */}
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>
              {days[selectedDay]}, June {dates[selectedDay]} — Appointments
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {appointments.map((appt, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 14px",
                    background: appt.confirmed === null ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${appt.confirmed === null ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 12,
                    borderLeft: appt.confirmed === true ? "3px solid #4ade80" : appt.confirmed === false ? "3px solid #facc15" : "3px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ width: 52, fontSize: 13, fontWeight: 600, color: "#adc6ff", flexShrink: 0 }}>{appt.time}</div>
                  {appt.confirmed !== null ? (
                    <>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{appt.name}</div>
                        <div style={{ fontSize: 11, color: "#8c909f", marginTop: 2 }}>{appt.vehicle} · {appt.service}</div>
                        <div style={{ fontSize: 11, color: "#8c909f" }}>Tech: {appt.tech}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20, color: appt.confirmed ? "#4ade80" : "#facc15", background: appt.confirmed ? "rgba(74,222,128,0.1)" : "rgba(250,204,21,0.1)" }}>
                          {appt.confirmed ? "Confirmed" : "Pending"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div style={{ flex: 1, color: "#8c909f", fontSize: 13, fontStyle: "italic" }}>Open slot — Click to book</div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Service selector + AI assistant */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* New booking */}
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>
              Book New Appointment
            </h2>

            {/* Step indicator */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: step >= s ? "#adc6ff" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>

            {step === 1 && (
              <>
                <p style={{ fontSize: 12, color: "#8c909f", margin: "0 0 12px" }}>Select services needed:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 14 }}>
                  {services.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      style={{
                        padding: "10px 12px",
                        background: selectedServices.includes(s.id) ? "rgba(173,198,255,0.1)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${selectedServices.includes(s.id) ? "rgba(173,198,255,0.4)" : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 10,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: selectedServices.includes(s.id) ? "#adc6ff" : "#8c909f", display: "block", marginBottom: 4 }}>{s.icon}</span>
                      <div style={{ fontSize: 11, fontWeight: 600, color: selectedServices.includes(s.id) ? "#adc6ff" : "#e5e2e1" }}>{s.label}</div>
                      <div style={{ fontSize: 10, color: "#8c909f", marginTop: 2 }}>{s.duration} · {s.price}</div>
                    </div>
                  ))}
                </div>
                <button
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep(2)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: selectedServices.length > 0 ? "#adc6ff" : "rgba(255,255,255,0.05)",
                    border: "none",
                    borderRadius: 10,
                    color: selectedServices.length > 0 ? "#002e6a" : "#8c909f",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: selectedServices.length > 0 ? "pointer" : "not-allowed",
                  }}
                >
                  Next: Customer Info
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <p style={{ fontSize: 12, color: "#8c909f", margin: "0 0 12px" }}>Customer details:</p>
                {[
                  { label: "Customer Name", placeholder: "e.g. Marcus Sterling" },
                  { label: "Phone Number", placeholder: "(555) 000-0000" },
                  { label: "Vehicle VIN / Plate", placeholder: "1GCVKNEC..." },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: "#8c909f", marginBottom: 4 }}>{f.label}</div>
                    <input
                      placeholder={f.placeholder}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
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
                ))}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#8c909f", cursor: "pointer", fontSize: 13 }}>
                    Back
                  </button>
                  <button onClick={() => setStep(3)} style={{ flex: 2, padding: "10px", background: "#adc6ff", border: "none", borderRadius: 10, color: "#002e6a", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    Confirm Booking
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "2px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: "#4ade80" }}>check_circle</span>
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#4ade80", margin: "0 0 6px", fontSize: 16 }}>Booked!</h3>
                <p style={{ color: "#8c909f", fontSize: 12, margin: "0 0 16px" }}>Appointment confirmed for {days[selectedDay]}, June {dates[selectedDay]}. SMS confirmation sent.</p>
                <button onClick={() => { setStep(1); setSelectedServices([]); }} style={{ padding: "8px 20px", background: "#adc6ff", border: "none", borderRadius: 8, color: "#002e6a", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
                  Book Another
                </button>
              </div>
            )}
          </GlassCard>

          {/* AI Suggestions */}
          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#adc6ff" }}>smart_toy</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, margin: 0 }}>AI Scheduler Tip</h2>
            </div>
            <p style={{ fontSize: 12, color: "#cac4d0", lineHeight: 1.5, margin: 0 }}>
              Bay 3 is free 11:00–14:00. Consider clustering the oil change and tire rotation for GMC-7729 back-to-back to optimize technician downtime.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
