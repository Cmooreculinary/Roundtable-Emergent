import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const initialItems = [
  { id: 1, sku: "OIL-5W30-QT", name: "Synthetic Motor Oil 5W-30", qty: 5, price: 8.40 },
  { id: 2, sku: "BRK-PAD-F1", name: "Front Brake Pad Set — Universal", qty: 1, price: 42.00 },
  { id: 3, sku: "SPARK-IRID-4", name: "Iridium Spark Plug Set (4)", qty: 1, price: 34.00 },
  { id: 4, sku: "AIR-FILT-K1", name: "Air Filter — High-Flow K&N", qty: 1, price: 28.50 },
];

export default function ShoppingCart() {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  const updateQty = (id, delta) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  return (
    <div style={{ padding: 28, background: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: "#8c909f", marginBottom: 4 }}>Unit #GMC-7729 · Marcus Sterling</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: "#e5e2e1", margin: 0 }}>
          Parts Cart
        </h1>
        <p style={{ color: "#8c909f", fontSize: 13, margin: "4px 0 0" }}>{items.length} items selected for service</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Cart items */}
        <GlassCard style={{ padding: 20 }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 0",
                borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(173,198,255,0.08)",
                  border: "1px solid rgba(173,198,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#adc6ff" }}>inventory_2</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "#8c909f", marginTop: 2 }}>SKU: {item.sku}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e5e2e1", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ width: 24, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e5e2e1", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              <div style={{ width: 72, textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "'Montserrat', sans-serif", color: "#e5e2e1" }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                <div style={{ fontSize: 10, color: "#8c909f" }}>${item.price.toFixed(2)} ea</div>
              </div>
              <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: "#8c909f", cursor: "pointer", padding: 4 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete_outline</span>
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#8c909f" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, display: "block", marginBottom: 10 }}>shopping_cart</span>
              Cart is empty
            </div>
          )}
        </GlassCard>

        {/* Order summary */}
        <div>
          <GlassCard style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>Order Summary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
                { label: "Tax (8.25%)", value: `$${tax.toFixed(2)}` },
                { label: "Core Charge", value: "$0.00" },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#8c909f" }}>{r.label}</span>
                  <span style={{ color: "#e5e2e1" }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 20, color: "#adc6ff" }}>
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/automotive/checkout")}
              style={{
                width: "100%",
                padding: "14px",
                background: "#adc6ff",
                border: "none",
                borderRadius: 12,
                color: "#002e6a",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                marginBottom: 10,
              }}
            >
              Proceed to Checkout
            </button>
            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                color: "#8c909f",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </GlassCard>

          <GlassCard style={{ padding: 16, marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#4ade80", marginBottom: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>local_shipping</span>
              Free shipping on orders over $75
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#adc6ff" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified_user</span>
              OEM-grade parts guaranteed
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
