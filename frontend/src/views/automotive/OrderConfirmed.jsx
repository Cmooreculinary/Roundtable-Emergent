import React from "react";
import { useNavigate } from "react-router-dom";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

export default function OrderConfirmed() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Radial glow */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(74,222,128,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 560, position: "relative" }}>
        {/* Success mark */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(74,222,128,0.12)",
              border: "2px solid #4ade80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 0 40px rgba(74,222,128,0.2)",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 42, color: "#4ade80" }}>check_circle</span>
          </div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 28, color: "#4ade80", margin: "0 0 8px" }}>
            Order Confirmed
          </h1>
          <p style={{ color: "#8c909f", fontSize: 14, margin: 0 }}>
            Your parts order has been placed and is being processed.
          </p>
        </div>

        {/* Order details */}
        <GlassCard style={{ padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ fontSize: 11, color: "#8c909f", marginBottom: 4 }}>Order Number</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: "#adc6ff" }}>#BSA-2026-04821</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#8c909f", marginBottom: 4 }}>Placed</div>
              <div style={{ fontSize: 13, color: "#e5e2e1", fontWeight: 500 }}>Jun 20, 2026 · 2:34 PM</div>
            </div>
          </div>

          {[
            { name: "Synthetic Motor Oil 5W-30 (5 qt)", qty: 5, price: "$42.00" },
            { name: "Front Brake Pad Set", qty: 1, price: "$42.00" },
            { name: "Iridium Spark Plug Set (4)", qty: 1, price: "$34.00" },
            { name: "K&N Air Filter", qty: 1, price: "$28.50" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(173,198,255,0.06)", border: "1px solid rgba(173,198,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#adc6ff" }}>inventory_2</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: "#8c909f" }}>Qty: {item.qty}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e5e2e1" }}>{item.price}</div>
            </div>
          ))}

          <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 4 }}>
            {[["Subtotal", "$146.50"], ["Tax", "$12.09"], ["Shipping", "FREE"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: "#8c909f" }}>{k}</span>
                <span style={{ color: v === "FREE" ? "#4ade80" : "#e5e2e1" }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Total Charged</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: "#adc6ff" }}>$158.59</span>
            </div>
          </div>
        </GlassCard>

        {/* Shipping info */}
        <GlassCard style={{ padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#8c909f", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Ship To</div>
              <div style={{ fontSize: 13, color: "#e5e2e1", lineHeight: 1.6 }}>
                Marcus Sterling<br />
                Bill Smith Automotive<br />
                1420 Commerce St<br />
                Dallas, TX 75201
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#8c909f", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Estimated Delivery</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: "#facc15", marginBottom: 4 }}>Jun 22–23</div>
              <div style={{ fontSize: 12, color: "#8c909f" }}>Standard · NAPA Distribution</div>
              <div style={{ marginTop: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: "#facc15", background: "rgba(250,204,21,0.1)" }}>Processing</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => navigate("/automotive/fleet")}
            style={{
              flex: 1,
              padding: "12px",
              background: "#adc6ff",
              border: "none",
              borderRadius: 12,
              color: "#002e6a",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Back to Fleet
          </button>
          <button
            onClick={() => navigate("/automotive/cart")}
            style={{
              flex: 1,
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              color: "#e5e2e1",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Order More Parts
          </button>
        </div>
      </div>
    </div>
  );
}
