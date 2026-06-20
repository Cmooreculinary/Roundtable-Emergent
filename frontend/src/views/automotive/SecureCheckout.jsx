import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

function Input({ label, placeholder, type = "text", maxLength }) {
  const [val, setVal] = useState("");
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 11, color: "#8c909f", display: "block", marginBottom: 4 }}>{label}</label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{
          width: "100%",
          padding: "10px 12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          color: "#e5e2e1",
          fontSize: 13,
          boxSizing: "border-box",
          outline: "none",
        }}
      />
    </div>
  );
}

export default function SecureCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
          Secure Checkout
        </h1>
        <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 4, color: "#4ade80" }}>lock</span>
          256-bit SSL encrypted
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Left: shipping + payment */}
        <div>
          <GlassCard style={{ padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#adc6ff" }}>local_shipping</span>
              Shipping Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div style={{ paddingRight: 8 }}><Input label="First Name" placeholder="Marcus" /></div>
              <div style={{ paddingLeft: 8 }}><Input label="Last Name" placeholder="Sterling" /></div>
            </div>
            <Input label="Address" placeholder="1420 Commerce St" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 8 }}>
              <Input label="City" placeholder="Dallas" />
              <Input label="State" placeholder="TX" />
              <Input label="ZIP" placeholder="75201" maxLength={5} />
            </div>
            <Input label="Phone" placeholder="(214) 555-0187" type="tel" />
          </GlassCard>

          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#adc6ff" }}>payment</span>
              Payment Method
            </h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[
                { id: "card", label: "Credit Card", icon: "credit_card" },
                { id: "net30", label: "Net 30 Account", icon: "account_balance" },
                { id: "ach", label: "ACH Transfer", icon: "swap_horiz" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  style={{
                    flex: 1,
                    padding: "10px 8px",
                    background: paymentMethod === m.id ? "rgba(173,198,255,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${paymentMethod === m.id ? "rgba(173,198,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 10,
                    color: paymentMethod === m.id ? "#adc6ff" : "#8c909f",
                    cursor: "pointer",
                    fontSize: 11,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <>
                <Input label="Card Number" placeholder="•••• •••• •••• ••••" maxLength={19} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Input label="Expiry" placeholder="MM / YY" />
                  <Input label="CVV" placeholder="•••" maxLength={4} />
                </div>
                <Input label="Name on Card" placeholder="Marcus Sterling" />
              </>
            )}

            {paymentMethod === "net30" && (
              <div style={{ padding: "14px 16px", background: "rgba(173,198,255,0.05)", border: "1px solid rgba(173,198,255,0.15)", borderRadius: 10, fontSize: 12, color: "#cac4d0" }}>
                Net 30 account on file for Bill Smith Automotive. Invoice will be generated automatically.
                <div style={{ marginTop: 8, fontWeight: 600, color: "#adc6ff" }}>Account: BSA-00247 · Credit available: $12,400</div>
              </div>
            )}

            {paymentMethod === "ach" && (
              <>
                <Input label="Bank Routing Number" placeholder="021000021" maxLength={9} />
                <Input label="Account Number" placeholder="•••••••••••" />
              </>
            )}
          </GlassCard>
        </div>

        {/* Order summary */}
        <div>
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>Order Summary</h2>
            {[
              ["Synthetic Motor Oil 5W-30 (5)", "$42.00"],
              ["Front Brake Pad Set", "$42.00"],
              ["Spark Plug Set (4)", "$34.00"],
              ["K&N Air Filter", "$28.50"],
            ].map(([n, p]) => (
              <div key={n} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                <span style={{ color: "#8c909f", flex: 1, marginRight: 8 }}>{n}</span>
                <span style={{ color: "#e5e2e1", fontWeight: 500, flexShrink: 0 }}>{p}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 12, paddingTop: 12 }}>
              {[["Subtotal", "$146.50"], ["Tax (8.25%)", "$12.09"], ["Shipping", "FREE"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: "#8c909f" }}>{k}</span>
                  <span style={{ color: v === "FREE" ? "#4ade80" : "#e5e2e1" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Total Due</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 20, color: "#adc6ff" }}>$158.59</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/automotive/order-confirmed")}
              style={{
                width: "100%",
                marginTop: 18,
                padding: "14px",
                background: "#adc6ff",
                border: "none",
                borderRadius: 12,
                color: "#002e6a",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock</span>
              Place Order · $158.59
            </button>

            <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, color: "#8c909f" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#4ade80" }}>verified_user</span>
              30-day return policy · OEM guaranteed
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
