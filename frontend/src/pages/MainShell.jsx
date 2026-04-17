import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TitleBar from "../components/rt/TitleBar";
import Sidebar from "../components/rt/Sidebar";
import Dock from "../components/rt/Dock";
import Portal from "../views/Portal";
import TableView from "../views/TableView";
import Communications from "../views/Communications";
import CalendarView from "../views/CalendarView";
import AppsView from "../views/AppsView";
import ContactsView from "../views/ContactsView";
import InvitesView from "../views/InvitesView";
import NotificationsView from "../views/NotificationsView";
import MessagesView from "../views/MessagesView";
import WalkieView from "../views/WalkieView";
import CreateTableModal from "../components/modals/CreateTableModal";
import NewEventModal from "../components/modals/NewEventModal";
import AddContactModal from "../components/modals/AddContactModal";
import ShareItemModal from "../components/modals/ShareItemModal";
import InviteModal from "../components/modals/InviteModal";
import VideoCallOverlay from "../components/modals/VideoCallOverlay";
import { api } from "../lib/api";

export default function MainShell() {
  const { user } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();
  const [tables, setTables] = useState([]);
  const [activeTableId, setActiveTableId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [modals, setModals] = useState({
    createTable: false, newEvent: false, addContact: false,
    shareItem: false, invite: false, videoCall: false,
  });
  const [modalProps, setModalProps] = useState({});

  const openModal = (name, props = {}) => { setModalProps(props); setModals((m) => ({ ...m, [name]: true })); };
  const closeModal = (name) => setModals((m) => ({ ...m, [name]: false }));

  const loadTables = useCallback(async () => {
    try {
      const { data } = await api.get("/tables");
      setTables(data);
      if (data.length && !activeTableId) setActiveTableId(data[0].id);
    } catch { /* ignore */ }
  }, [activeTableId]);

  const loadNotifications = useCallback(async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    loadTables();
    loadNotifications();
    const int = setInterval(loadNotifications, 20000);
    return () => clearInterval(int);
  }, [loadTables, loadNotifications]);

  // Keyboard: Escape dismisses overlays
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") {
        setModals({ createTable: false, newEvent: false, addContact: false, shareItem: false, invite: false, videoCall: false });
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const setActiveTable = async (id) => {
    setActiveTableId(id);
    nav(`/table/${id}`);
  };

  return (
    <div className="app-root">
      <TitleBar notificationsCount={unreadCount} onOpenNotifications={() => nav("/notifications")} />
      <div className="app-body">
        <Sidebar
          tables={tables}
          activeTableId={activeTableId}
          currentPath={loc.pathname}
          onNav={(p) => nav(p)}
          onSelectTable={setActiveTable}
          onCreateTable={() => openModal("createTable")}
        />
        <main className="main-content" data-testid="main-content">
          <Routes>
            <Route path="/" element={<Portal tables={tables} notifications={notifications} onOpenInvite={() => openModal("invite", { tables })} onOpenShare={() => openModal("shareItem", { tables })} onCreateTable={() => openModal("createTable")} onNewEvent={() => openModal("newEvent", { tables })} onGoto={nav} />} />
            <Route path="/table/:id" element={<TableView onShare={(table) => openModal("shareItem", { tables, defaultTable: table })} onInvite={(table) => openModal("invite", { tables, defaultTable: table })} onVideoCall={(target) => openModal("videoCall", { target })} />} />
            <Route path="/messages" element={<Communications tables={tables} onVideoCall={(target) => openModal("videoCall", { target })} />} />
            <Route path="/messages/full" element={<MessagesView onVideoCall={(target) => openModal("videoCall", { target })} />} />
            <Route path="/walkie" element={<WalkieView onVideoCall={(target) => openModal("videoCall", { target })} />} />
            <Route path="/calendar" element={<CalendarView onNew={() => openModal("newEvent", { tables })} tables={tables} />} />
            <Route path="/apps" element={<AppsView />} />
            <Route path="/contacts" element={<ContactsView onAdd={() => openModal("addContact")} onInvite={() => openModal("invite", { tables })} />} />
            <Route path="/invites" element={<InvitesView tables={tables} onOpenInvite={() => openModal("invite", { tables })} />} />
            <Route path="/notifications" element={<NotificationsView notifications={notifications} onRefresh={loadNotifications} />} />
          </Routes>
        </main>
      </div>
      <Dock currentPath={loc.pathname} onNav={nav} unreadCount={unreadCount} />

      {modals.createTable && <CreateTableModal onClose={() => closeModal("createTable")} onCreated={() => { loadTables(); closeModal("createTable"); }} />}
      {modals.newEvent && <NewEventModal tables={modalProps.tables || tables} onClose={() => closeModal("newEvent")} onCreated={() => closeModal("newEvent")} />}
      {modals.addContact && <AddContactModal onClose={() => closeModal("addContact")} onCreated={() => closeModal("addContact")} />}
      {modals.shareItem && <ShareItemModal tables={modalProps.tables || tables} defaultTable={modalProps.defaultTable} onClose={() => closeModal("shareItem")} onShared={() => { closeModal("shareItem"); loadTables(); }} />}
      {modals.invite && <InviteModal tables={modalProps.tables || tables} defaultTable={modalProps.defaultTable} onClose={() => closeModal("invite")} />}
      {modals.videoCall && <VideoCallOverlay target={modalProps.target} onClose={() => closeModal("videoCall")} />}
    </div>
  );
}
