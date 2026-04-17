import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ icon, title, subtitle, action, testId }) {
  return (
    <div className="empty-state" data-testid={testId || "empty-state"}>
      <div className="empty-icon">{icon || <Inbox size={30} />}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 380, marginBottom: 14 }}>{subtitle}</div>}
      {action}
    </div>
  );
}
