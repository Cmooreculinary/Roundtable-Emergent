import React from "react";
import { api } from "../lib/api";
import { Bell, Check, Trash2 } from "lucide-react";
import EmptyState from "../components/rt/EmptyState";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function NotificationsView({ notifications, onRefresh }) {
  const markAll = async () => { await api.post("/notifications/read_all"); onRefresh?.(); };
  const clearAll = async () => {
    if (window.confirm("Move all notifications to trash?")) {
      await api.delete("/notifications/clear-all");
      toast.success("Notifications cleared");
      onRefresh?.();
    }
  };

  const timeAgo = (iso) => { try { return formatDistanceToNow(new Date(iso), { addSuffix: true }); } catch (err) { return ""; } };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Notifications</h1>
        <button className="btn btn-secondary" onClick={markAll} data-testid="notif-mark-all"><Check size={14} /> Mark all read</button>
        {notifications.length > 0 && <button className="btn btn-secondary" onClick={clearAll} data-testid="notif-clear-all" style={{ color: "var(--mac-red)" }}><Trash2 size={14} /> Clear All</button>}
      </div>
      {notifications.length === 0 ? (
        <EmptyState icon={<Bell size={28} />} title="Nothing here yet" subtitle="When things happen, you'll see them here." testId="notif-empty" />
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {notifications.map((n) => (
            <div key={n.id} style={{ padding: 12, display: "flex", gap: 10, alignItems: "start", borderBottom: "1px solid var(--border-light)", background: n.read ? "transparent" : "rgba(0,122,255,0.04)" }} data-testid={`notif-${n.id}`}>
              <div className="avatar" style={{ width: 32, height: 32, background: n.from_color || "var(--mac-gray)", fontSize: 11 }}>{n.from_initials || "?"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>{n.message}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{timeAgo(n.created_at)}</div>
              </div>
              {!n.read && <span style={{ width: 8, height: 8, borderRadius: 8, background: "var(--mac-blue)", marginTop: 6 }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
