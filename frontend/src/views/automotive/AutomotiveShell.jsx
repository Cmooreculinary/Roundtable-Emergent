import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import FleetCommander from "./FleetCommander";
import AdminControl from "./AdminControl";
import AdminInventory from "./AdminInventory";
import ServiceScheduling from "./ServiceScheduling";
import CustomerProfile from "./CustomerProfile";
import VinScan from "./VinScan";
import ShoppingCart from "./ShoppingCart";
import OrderConfirmed from "./OrderConfirmed";
import SecureCheckout from "./SecureCheckout";
import VoiceCalibration from "./VoiceCalibration";
import ApexPulse from "./ApexPulse";
import WarehouseHUD from "./WarehouseHUD";
import RepairSummary from "./RepairSummary";

const nav = [
  { icon: "dashboard", label: "Fleet Commander", path: "/automotive/fleet" },
  { icon: "admin_panel_settings", label: "Admin Control", path: "/automotive/admin" },
  { icon: "inventory_2", label: "Inventory", path: "/automotive/inventory" },
  { icon: "calendar_month", label: "Scheduling", path: "/automotive/scheduling" },
  { icon: "person", label: "Customer Profile", path: "/automotive/customer" },
  { icon: "qr_code_scanner", label: "VIN Scan", path: "/automotive/vin-scan" },
  { icon: "shopping_cart", label: "Parts Cart", path: "/automotive/cart" },
  { icon: "warehouse", label: "Warehouse HUD", path: "/automotive/warehouse" },
  { icon: "bolt", label: "Apex Pulse", path: "/automotive/apex-pulse" },
  { icon: "mic", label: "Voice Calibration", path: "/automotive/voice-calibration" },
  { icon: "summarize", label: "Repair Summary", path: "/automotive/repair-summary" },
];

export default function AutomotiveShell() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        fontFamily: "'Inter', sans-serif",
        color: "#e5e2e1",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? 64 : 240,
          minHeight: "100vh",
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s ease",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed ? "20px 0" : "20px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
          onClick={() => navigate("/automotive/fleet")}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #adc6ff 0%, #4d8eff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#002e6a" }}>
              directions_car
            </span>
          </div>
          {!collapsed && (
            <div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "#adc6ff",
                  letterSpacing: 1,
                  lineHeight: 1.1,
                }}
              >
                BILL SMITH
              </div>
              <div style={{ fontSize: 9, color: "#8c909f", letterSpacing: 2 }}>TORQUE VISION AI</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: collapsed ? "10px 0" : "10px 16px",
                justifyContent: collapsed ? "center" : "flex-start",
                textDecoration: "none",
                color: isActive ? "#adc6ff" : "#8c909f",
                background: isActive ? "rgba(173,198,255,0.08)" : "transparent",
                borderLeft: isActive ? "2px solid #adc6ff" : "2px solid transparent",
                marginBottom: 2,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.15s",
              })}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle + back to app */}
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "#8c909f",
              cursor: "pointer",
              fontSize: 12,
              marginBottom: 8,
              justifyContent: collapsed ? "center" : "flex-start",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
            {!collapsed && "Back to Round Table"}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
              background: "transparent",
              border: "none",
              color: "#8c909f",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              {collapsed ? "chevron_right" : "chevron_left"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, minHeight: "100vh", overflowY: "auto" }}>
        <Routes>
          <Route path="fleet" element={<FleetCommander />} />
          <Route path="admin" element={<AdminControl />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="scheduling" element={<ServiceScheduling />} />
          <Route path="customer" element={<CustomerProfile />} />
          <Route path="vin-scan" element={<VinScan />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="order-confirmed" element={<OrderConfirmed />} />
          <Route path="checkout" element={<SecureCheckout />} />
          <Route path="voice-calibration" element={<VoiceCalibration />} />
          <Route path="apex-pulse" element={<ApexPulse />} />
          <Route path="warehouse" element={<WarehouseHUD />} />
          <Route path="repair-summary" element={<RepairSummary />} />
          <Route index element={<FleetCommander />} />
        </Routes>
      </main>
    </div>
  );
}
