import React, { useState, useEffect } from "react";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

export default function VinScan() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [manualVin, setManualVin] = useState("");

  useEffect(() => {
    if (scanning) {
      const t = setTimeout(() => { setScanning(false); setScanned(true); }, 2800);
      return () => clearTimeout(t);
    }
  }, [scanning]);

  const reset = () => { setScanning(false); setScanned(false); setManualVin(""); };

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
          VIN Scanner
        </h1>
        <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>Scan or enter a VIN to instantly pull vehicle data</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        {/* Camera HUD */}
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              height: 420,
              background: scanned
                ? "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(0,0,0,0.95) 100%)"
                : "linear-gradient(135deg, rgba(5,5,5,0.98) 0%, rgba(10,20,40,0.95) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "background 0.5s",
            }}
          >
            {/* Grid lines */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(173,198,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(173,198,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* Scan frame */}
            <div style={{ position: "relative", width: 280, height: 100 }}>
              {/* Corner marks */}
              {[
                { top: 0, left: 0, borderTop: true, borderLeft: true },
                { top: 0, right: 0, borderTop: true, borderRight: true },
                { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
                { bottom: 0, right: 0, borderBottom: true, borderRight: true },
              ].map((corner, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    ...corner,
                    borderWidth: 0,
                    ...(corner.borderTop ? { borderTopWidth: 2, borderTopStyle: "solid", borderTopColor: scanned ? "#4ade80" : "#adc6ff" } : {}),
                    ...(corner.borderLeft ? { borderLeftWidth: 2, borderLeftStyle: "solid", borderLeftColor: scanned ? "#4ade80" : "#adc6ff" } : {}),
                    ...(corner.borderRight ? { borderRightWidth: 2, borderRightStyle: "solid", borderRightColor: scanned ? "#4ade80" : "#adc6ff" } : {}),
                    ...(corner.borderBottom ? { borderBottomWidth: 2, borderBottomStyle: "solid", borderBottomColor: scanned ? "#4ade80" : "#adc6ff" } : {}),
                  }}
                />
              ))}

              {/* Scan line */}
              {scanning && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg, transparent, #adc6ff, transparent)",
                    boxShadow: "0 0 10px #adc6ff",
                    animation: "scanLine 1.4s ease-in-out infinite",
                  }}
                />
              )}

              {/* Center content */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {!scanning && !scanned && (
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(173,198,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>
                    Align barcode here
                  </div>
                )}
                {scanning && (
                  <div style={{ fontSize: 11, color: "#adc6ff", letterSpacing: 2, textTransform: "uppercase", animation: "blink 0.8s infinite" }}>
                    Scanning…
                  </div>
                )}
                {scanned && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#4ade80" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>VIN CAPTURED</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom HUD label */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 10,
                color: "rgba(173,198,255,0.6)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Torque Vision · VIN Scanner v2.4
            </div>

            {/* Top status */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                background: "rgba(0,0,0,0.6)",
                borderRadius: 20,
                border: `1px solid ${scanned ? "rgba(74,222,128,0.4)" : "rgba(173,198,255,0.2)"}`,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: scanned ? "#4ade80" : scanning ? "#facc15" : "#adc6ff", animation: scanning ? "blink 0.8s infinite" : "none" }} />
              <span style={{ fontSize: 10, color: scanned ? "#4ade80" : "#adc6ff", fontWeight: 600 }}>
                {scanned ? "LOCKED" : scanning ? "ACTIVE" : "READY"}
              </span>
            </div>
          </div>

          {/* Scan button */}
          <div style={{ padding: 20, display: "flex", gap: 10 }}>
            {!scanned ? (
              <button
                onClick={() => { if (!scanning) setScanning(true); }}
                disabled={scanning}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: scanning ? "rgba(173,198,255,0.1)" : "#adc6ff",
                  border: "none",
                  borderRadius: 12,
                  color: scanning ? "#adc6ff" : "#002e6a",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: scanning ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>qr_code_scanner</span>
                {scanning ? "Scanning…" : "Start Scan"}
              </button>
            ) : (
              <>
                <button onClick={reset} style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#e5e2e1", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  Scan Again
                </button>
                <button style={{ flex: 2, padding: "12px", background: "#4ade80", border: "none", borderRadius: 12, color: "#052e16", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                  View Vehicle Record
                </button>
              </>
            )}
          </div>
        </GlassCard>

        {/* Manual entry + result */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>Manual VIN Entry</h2>
            <input
              value={manualVin}
              onChange={(e) => setManualVin(e.target.value.toUpperCase())}
              placeholder="1GCVKNEC4NZ123456"
              maxLength={17}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${manualVin.length === 17 ? "rgba(173,198,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10,
                color: "#e5e2e1",
                fontSize: 14,
                fontFamily: "monospace",
                letterSpacing: 2,
                boxSizing: "border-box",
                outline: "none",
                marginBottom: 10,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "#8c909f" }}>{manualVin.length}/17 characters</span>
              {manualVin.length === 17 && <span style={{ fontSize: 11, color: "#4ade80" }}>✓ Valid length</span>}
            </div>
            <button
              disabled={manualVin.length !== 17}
              style={{
                width: "100%",
                padding: "10px",
                background: manualVin.length === 17 ? "#adc6ff" : "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: 10,
                color: manualVin.length === 17 ? "#002e6a" : "#8c909f",
                fontWeight: 600,
                fontSize: 13,
                cursor: manualVin.length === 17 ? "pointer" : "not-allowed",
              }}
            >
              Look Up VIN
            </button>
          </GlassCard>

          {scanned && (
            <GlassCard style={{ padding: 20, border: "1px solid rgba(74,222,128,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#4ade80" }}>verified</span>
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: 0, color: "#4ade80" }}>VIN Matched</h2>
              </div>
              {[
                ["VIN", "1GCVKNEC4NZ123456"],
                ["Year", "2022"],
                ["Make", "GMC"],
                ["Model", "Sierra 1500"],
                ["Trim", "SLT"],
                ["Engine", "5.3L V8 EcoTec3"],
                ["Owner", "Marcus Sterling"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12 }}>
                  <span style={{ color: "#8c909f" }}>{k}</span>
                  <span style={{ color: "#e5e2e1", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </GlassCard>
          )}

          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, margin: "0 0 10px" }}>Recent Scans</h2>
            {["1GCVKNEC4NZ123456 · GMC Sierra", "3C6UR5DL4MG721101 · Ram 1500", "2HKRW2H8XKH100789 · Honda CR-V"].map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", fontSize: 11, color: "#8c909f", cursor: "pointer" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#adc6ff" }}>history</span>
                {v}
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      <style>{`
        @keyframes scanLine { 0% { top: 5px; } 50% { top: 90px; } 100% { top: 5px; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
