import React, { useState } from "react";
import { Mail, Calendar, FileText, MessageSquare, Video, Cloud, Map, Camera, Music, ShoppingBag, Tv, Book, Newspaper, Phone, Heart, Compass, Wrench, Palette, Shield, Image as ImgIcon, FileSpreadsheet, Presentation, Film, Clock } from "lucide-react";

const APPS = [
  { name: "Mail", vendor: "apple", icon: <Mail />, bg: "linear-gradient(135deg, #5AC8FA, #007AFF)" },
  { name: "Calendar", vendor: "apple", icon: <Calendar />, bg: "linear-gradient(135deg, #FF3B30, #FF9500)" },
  { name: "Notes", vendor: "apple", icon: <FileText />, bg: "linear-gradient(135deg, #FFCC00, #FF9500)" },
  { name: "Messages", vendor: "apple", icon: <MessageSquare />, bg: "linear-gradient(135deg, #34C759, #5AC8FA)" },
  { name: "FaceTime", vendor: "apple", icon: <Video />, bg: "linear-gradient(135deg, #34C759, #007AFF)" },
  { name: "iCloud", vendor: "apple", icon: <Cloud />, bg: "linear-gradient(135deg, #5AC8FA, #AF52DE)" },
  { name: "Maps", vendor: "apple", icon: <Map />, bg: "linear-gradient(135deg, #34C759, #5AC8FA)" },
  { name: "Photos", vendor: "apple", icon: <Camera />, bg: "linear-gradient(135deg, #FF9500, #FF2D55)" },
  { name: "Gmail", vendor: "google", icon: <Mail />, bg: "linear-gradient(135deg, #EA4335, #FBBC05)" },
  { name: "Drive", vendor: "google", icon: <Cloud />, bg: "linear-gradient(135deg, #4285F4, #34A853)" },
  { name: "Docs", vendor: "google", icon: <FileText />, bg: "linear-gradient(135deg, #4285F4, #34A853)" },
  { name: "Sheets", vendor: "google", icon: <FileSpreadsheet />, bg: "linear-gradient(135deg, #34A853, #0F9D58)" },
  { name: "Slides", vendor: "google", icon: <Presentation />, bg: "linear-gradient(135deg, #FBBC05, #EA4335)" },
  { name: "Meet", vendor: "google", icon: <Video />, bg: "linear-gradient(135deg, #00AC47, #4285F4)" },
  { name: "Calendar", vendor: "google", icon: <Calendar />, bg: "linear-gradient(135deg, #4285F4, #34A853)" },
  { name: "YouTube", vendor: "google", icon: <Film />, bg: "linear-gradient(135deg, #FF0000, #CC0000)" },
  { name: "Outlook", vendor: "microsoft", icon: <Mail />, bg: "linear-gradient(135deg, #0078D4, #00BCF2)" },
  { name: "Word", vendor: "microsoft", icon: <FileText />, bg: "linear-gradient(135deg, #2B579A, #41729F)" },
  { name: "Excel", vendor: "microsoft", icon: <FileSpreadsheet />, bg: "linear-gradient(135deg, #217346, #2E9C5D)" },
  { name: "PowerPoint", vendor: "microsoft", icon: <Presentation />, bg: "linear-gradient(135deg, #D24726, #E6693E)" },
  { name: "Teams", vendor: "microsoft", icon: <MessageSquare />, bg: "linear-gradient(135deg, #6264A7, #464EB8)" },
  { name: "OneDrive", vendor: "microsoft", icon: <Cloud />, bg: "linear-gradient(135deg, #0078D4, #4A90E2)" },
  { name: "Music", vendor: "apple", icon: <Music />, bg: "linear-gradient(135deg, #FF2D55, #AF52DE)" },
  { name: "Clock", vendor: "apple", icon: <Clock />, bg: "linear-gradient(135deg, #3A3A3C, #1C1C1E)" },
];

export default function AppsView() {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? APPS : APPS.filter((a) => a.vendor === filter);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Apps</h1>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "apple", "google", "microsoft"].map((f) => (
            <button key={f} className={`btn ${filter === f ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilter(f)} data-testid={`apps-filter-${f}`} style={{ textTransform: "capitalize" }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 14 }}>
        {shown.map((a, i) => (
          <div key={`${a.name}-${a.vendor}-${i}`} className="card card-hover" style={{ padding: 14, textAlign: "center", cursor: "pointer" }} data-testid={`app-${a.name}-${a.vendor}`}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: a.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              {a.icon}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{a.name}</div>
            <div style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "capitalize" }}>{a.vendor}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
