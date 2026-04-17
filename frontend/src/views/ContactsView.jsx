import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Search, Check, UserPlus, Plus, MessageSquare } from "lucide-react";
import EmptyState from "../components/rt/EmptyState";
import HelpTip from "../components/rt/HelpTip";

export default function ContactsView({ onAdd, onInvite }) {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");

  const load = () => api.get("/contacts").then((r) => setContacts(r.data || []));
  useEffect(() => { load(); }, []);

  const matched = contacts.filter((c) => (c.name || "").toLowerCase().includes(query.toLowerCase()));
  const onApp = matched.filter((c) => c.is_member);
  const offApp = matched.filter((c) => !c.is_member);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <HelpTip section="contacts" text="Everyone you know. Green check = already on Round Table. Blue button = invite them." />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 10 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Contacts</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onInvite} data-testid="contacts-invite-btn"><UserPlus size={14} /> Invite</button>
          <button className="btn btn-primary" onClick={onAdd} data-testid="contacts-add-btn"><Plus size={14} /> Add Contact</button>
        </div>
      </div>

      <div className="card" style={{ padding: 10, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
          <Search size={14} color="var(--text-tertiary)" />
          <input className="input" style={{ border: "none", background: "transparent", padding: 4 }} placeholder="Search contacts…" value={query} onChange={(e) => setQuery(e.target.value)} data-testid="contacts-search" />
        </div>
      </div>

      {contacts.length === 0 ? (
        <EmptyState icon={<UserPlus size={28} />} title="No contacts yet" subtitle="Add people to grow your network." action={<button className="btn btn-primary" onClick={onAdd} data-testid="contacts-empty-add">Add Contact</button>} testId="contacts-empty" />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Section title={`On Round Table (${onApp.length})`} emptyMsg="Nobody from your contacts is on yet." color="var(--mac-green)">
            {onApp.map((c) => (
              <Row key={c.id} contact={c} isMember />
            ))}
          </Section>
          <Section title={`Not on Round Table (${offApp.length})`} emptyMsg="Everyone's already in." color="var(--mac-blue)">
            {offApp.map((c) => (
              <Row key={c.id} contact={c} onInvite={onInvite} />
            ))}
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({ title, emptyMsg, color, children }) {
  const arr = React.Children.toArray(children);
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</div>
      {arr.length === 0 ? <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{emptyMsg}</div> : children}
    </div>
  );
}

function Row({ contact, isMember, onInvite }) {
  const init = (contact.name || "?").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border-light)" }} data-testid={`contact-${contact.id}`}>
      <div className="avatar" style={{ width: 32, height: 32, background: contact.member_color || "#8E8E93", fontSize: 11 }}>{contact.member_initials || init}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          {contact.name}
          {isMember && <Check size={12} color="var(--mac-green)" />}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{contact.email || contact.phone || "No contact info"}</div>
      </div>
      {isMember ? (
        <button className="btn btn-secondary" data-testid={`contact-chat-${contact.id}`}><MessageSquare size={12} /></button>
      ) : (
        <button className="btn btn-primary" onClick={onInvite} data-testid={`contact-invite-${contact.id}`}>Invite</button>
      )}
    </div>
  );
}
