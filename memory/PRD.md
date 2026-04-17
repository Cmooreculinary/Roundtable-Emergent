# Round Table — Product Requirements Document

## Original Vision
> "Round Table is a macOS-styled unified collaboration platform that replaces Slack, WhatsApp, Google Suite, email, and SMS with a single, visually intuitive interface organized around the metaphor of gathering at a table. Built for families, faith communities, project teams, and neighborhoods. Core principle: If you can sit at a table, you can collaborate."

## Core Product Principle (user-emphasized, hard requirement)
**Per-table data isolation.** "Each table will hold all of the info at that table, no bleeding and much easier on the user." When a user views a specific table, they see only that table's members, items, events, and chat — no cross-table contamination.

## User Personas
- **Family steward** — keeps everyone on the same page (events, photos, group chat).
- **Faith community leader** — coordinates a group with shared resources.
- **Project lead** — runs a small team without enterprise overhead.
- **Neighborhood organizer** — keeps neighbors connected.

## Tech Stack
- Backend: FastAPI + MongoDB + JWT (httpOnly cookies, bcrypt).
- Frontend: React 19 + react-router-dom + Tailwind + lucide-react + sonner.
- File storage: Emergent Object Storage (uploads/{user_id}/{uuid}.{ext}).
- Real-time: Native WebSockets (signaling + presence + chat + WebRTC).
- Push: VAPID-based Web Push via pywebpush.
- AI: Claude Sonnet 4.5 via Emergent Universal LLM Key.

## Phase 1 — Implemented (Feb 2026)
### Backend
- Auth: register, login, logout, me (httpOnly cookies, bcrypt, admin seed)
- Users: get/update profile, list members
- Tables: full CRUD with role-aware membership (owner/admin/member)
- Shared items per table (CRUD)
- File upload via Emergent Object Storage + protected download
- Messages (1:1 + table-scoped)
- Emails (folders: inbox/sent/starred/trash, read/star toggles)
- Texts (SMS-style)
- Events (per-table or personal, color-coded)
- Notifications + walkie pings
- Invites (codes, max-uses, expiry, join flow)
- Contacts (auto-match against existing users)
- Referrals + leaderboard
- Auth + table membership guards on all protected routes
- _id excluded from all responses

### Frontend
- macOS title bar (traffic lights, centered title, theme toggle, notifications, profile)
- Left sidebar (240px) — nav + Round Tables list with live/dormant states
- macOS dock (glass morphism, hover-lift, tooltips, unread badge)
- 5-step onboarding wizard with progress bar + live table preview
- Portal dashboard — 6 widgets + Communications Hub (Email/Texts/Chat/Walkie tabs)
- Round Table view — circular wood-grain table, radial member seats, items on surface
- Calendar — monthly grid, color-coded events, table filter
- Messages — two-pane with walkie/video shortcuts
- App Launcher — 24 apps with vendor filter
- Contacts, Invites, Notifications views
- Light/Dark mode toggle, empty states, contextual help tooltips

## Phase 2 — Implemented (Feb 2026)
### Real-time layer
- WebSocket endpoint `/api/ws` with cookie auth + fallback token
- WSManager with per-user connections, presence, table broadcasts
- Live events: presence, user_updated, message, text, walkie_ping, item_added, referral_joined, typing
- Frontend useWebSocket + useRTEvent hooks with auto-reconnect, ping/pong keepalive

### Bonus pack
- Settings page, Mobile sidebar drawer, Responsive CSS, PWA installable
- Walkie ping toast, Founders badge celebration

## Phase 3 — Implemented (Feb 2026)
### Growth loop
- Public `/join/:code` landing page with table preview
- ShareBadge on BadgeUnlock with navigator.share + clipboard fallback

### AI assist (Claude Sonnet 4.5)
- `POST /api/tables/{id}/suggest-events` — 3 tailored event suggestions
- SmartSuggestions widget in TableView

### Community depth
- Table purpose field (6 options), Purpose picker in CreateTableModal
- Prayer & Intention shared-item types

## Phase 4 — Implemented (Feb 2026)
### Prayer Wall
- `GET /api/tables/{id}/prayers` — prayer + intention items with reactions
- Prayer Wall tab in TableView with count badge

### Reactions on shared items
- `POST /api/tables/{id}/items/{item_id}/react` — toggle praying/amen/heart/thanks
- Live-broadcast over WebSocket

### Recurring events
- Weekly/monthly recurring with virtual expansion up to 90 days

### Purpose-based starter templates
- Auto-seed events + items when creating tables based on purpose

## Phase 5 — Implemented (Apr 2026)

### Real WebRTC Walkie-Talkie + Video Calls (Group Support)
- **Backend signaling** via existing WebSocket: `call_start`, `call_join`, `call_leave`, `webrtc_offer`, `webrtc_answer`, `webrtc_ice`, `walkie_talk_state` message types
- **In-memory call tracking**: `active_calls` dict with participants, type, table_id
- **REST endpoint**: `GET /api/calls/active` — list active calls (filterable by table_id)
- **Auto-cleanup**: When user disconnects from WebSocket, they're removed from active calls; empty calls are cleaned up
- **Frontend WebRTC service** (`/app/frontend/src/lib/webrtc.js`): Mesh topology peer connection management, media stream handling, ICE/SDP exchange
- **WalkieView** rewritten: "Join Walkie Room" creates real audio call, push-to-talk mutes/unmutes audio track, shows who's currently talking, walkie_talk_state broadcasts
- **VideoCallOverlay** rewritten: Real video + audio streams, local video PiP, remote peer video grid, proper mute/camera/end controls, supports both outgoing and incoming calls
- **IncomingCallToast** component: Ring tone, caller info, Answer/Decline buttons, 30s auto-dismiss
- **STUN servers**: Google's free STUN (`stun.l.google.com:19302`, `stun1.l.google.com:19302`)

### Web Push Notifications
- **VAPID keys** generated and stored in backend .env
- **Endpoints**: `GET /api/push/vapid-key` (public), `POST /api/push/subscribe`, `POST /api/push/unsubscribe`
- **Push triggers**: Walkie pings, direct messages, and incoming calls (when user is offline/not connected via WebSocket)
- **Service Worker** updated with `push` event listener — shows native browser notification with icon, vibrate, tag
- **Notification click** focuses existing tab or opens app to relevant route (walkie/messages)
- **Frontend**: `push.js` subscription manager, auto-subscribe on login if permission granted, Settings page toggle
- **Dead subscription cleanup**: 404/410 responses auto-remove stale endpoints

### SMS/Email Bridges (Infrastructure Ready)
- **`GET /api/bridges/status`** — returns which bridges are configured
- **`POST /api/bridges/sms`** — sends SMS via Twilio (returns 503 until keys provided)
- **`POST /api/bridges/email`** — sends email via Resend (returns 503 until keys provided)
- **Configuration**: Reads `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `RESEND_API_KEY` from .env
- Ready for activation once user provides API keys

## Backlog

### Deferred Enhancement (user said "remember, don't build yet")
- **Public "We're praying for X" embeddable widget** — church/community websites embed badge linking to `/join/:code`

### P1
- Prayer reply threads (comments on prayers within the Prayer Wall)
- Table roles management UI
- Activity feed per table (timeline of all table actions)

### P2
- End-to-end encryption for messages
- Per-table file/folder browser
- Device contact import
- Analytics dashboard for table owners
- Audit log + soft-delete recovery
- Notification preferences per channel

## Test Credentials
See `/app/memory/test_credentials.md`

## Test Status
- **Iteration 1 (Phase 1):** Backend 40/40 (100%), Frontend 95%
- **Iteration 2 (Phase 2):** Backend 51/51 (100%), Frontend 100%
- **Iteration 3 (Phase 3):** Backend 32/32 (100%), Frontend 100%
- **Iteration 4 (Phase 4):** Backend 34/34 (100%), Frontend 100%
- **Iteration 5 (Phase 5):** Backend 23/23 (100%), Frontend 100% — zero regressions
