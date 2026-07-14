# Round Table — Complete Explainer Document

---

## What Is Round Table?

**Round Table** is a collaboration platform that brings groups of people together — families, faith communities, project teams, or any circle of people who share life together — around a single, beautiful interface inspired by macOS.

The central metaphor is a **round table**: a visual, interactive graphic that represents your group. Each member appears as an avatar seat around the table. Everything you share — photos, documents, audio, video, links — appears *on the table surface* where everyone can see it and work on it together. The more people who join, the bigger the table grows.

It replaces the chaos of scattered group chats, shared drives, calendar apps, and video calls with **one unified space** that feels natural, intuitive, and personal.

---

## The Vision

Most collaboration tools are built for corporations. They're complex, impersonal, and designed around workflows — not relationships.

Round Table is built for **real groups**:
- A family managing their household calendar, sharing vacation photos, and keeping a shared budget
- A faith group coordinating Bible study, sharing sermon links, and praying together in real-time
- A project team reviewing documents, demo videos, and coordinating deadlines
- A neighborhood circle sharing local events, emergency contacts, and community photos

The design philosophy is simple: **if you can sit at a table together, you should be able to collaborate together** — without learning enterprise software.

---

## Core Concepts

### 1. The Round Table (Central Metaphor)

Every group has its own **Round Table**. This is not an abstract list or feed — it's a literal circular table rendered on screen.

**How it works:**
- When you create a table, you give it a name (e.g., "Family Circle," "Faith Group," "Project Alpha") and invite members
- Each member gets a **seat** — a colored avatar with their initials, positioned around the circumference of the table
- Items that members share appear as **icons on the table surface**, arranged in a circle, each with a type-specific icon (camera for photos, document icon for files, music note for audio, etc.)
- The table **dynamically resizes** based on member count: 2 members = small intimate table; 5 members = larger table; 10+ members = full conference-size table
- You can create **unlimited tables** — one for family, one for your church group, one for your project team, one for your book club

**Live vs. Dormant states:**
- A table is **Live** when members are actively using it — the table glows with warm golden light, a shimmer sweeps across the wood surface, a pulsing green ring surrounds it, member avatars glow, and items gently float
- A table is **Dormant** when no one is active — the wood desaturates to gray-brown, the glow disappears, items and seats fade, and a dashed gray border replaces the ring
- This gives you an instant visual sense of where the activity is across all your groups

### 2. Personal Portal — The Communications Hub

When you open Round Table, you land on **My Portal** — a command-center dashboard that puts **every form of communication in one place**:

**Top section — Communications Hub:**
The Portal features a unified communications bar with four tabs that let you switch instantly between:

- **Email** — A full mini email client built right into the portal. Inbox with unread count, sender avatars, subject lines, timestamps, and body previews. Star important emails. Compose new emails with To, Subject, and Body fields. Switch between Inbox, Sent, and Starred folders. Reply inline. No need to leave Round Table to check email.
- **Texts** — An SMS/iMessage-style texting panel. Left side shows conversations grouped by contact with unread indicators. Right side shows the chat thread with green (sent) and gray (received) bubbles. Type and send texts instantly. Separate from in-app chat messages — this is for real phone-style texting.
- **Chat** — The existing in-app messaging system for Round Table members. Thread list with avatars, previews, timestamps, and unread dots. Full chat view with blue/gray bubbles.
- **Walkie** — Quick-access walkie-talkie panel showing online members, push-to-talk button, and ping controls — all without leaving the portal.

**Below the Communications Hub — Dashboard Widgets:**
- **Today widget** — Your schedule for the day, pulled from all shared calendars across every table, color-coded by group
- **Recent on Tables** — The latest items shared to any of your tables (photos, docs, audio), with the table name and time
- **My Tables overview** — All your tables with Live/Idle status, member count, item count, and active member avatars for live tables
- **Quick Actions** — One-click buttons: New Table, New Event, Walkie Talkie, Apps, Invite, Contacts
- **Invite & Referrals widget** — Your invite stats (people invited, people joined), your referral badge (Newcomer → Starter → Connector → Ambassador), and a leaderboard of top inviters
- **Notifications** — Walkie-talkie pings, share alerts, event alerts — all in one stream

### 3. Dark Mode / Light Mode

Round Table supports a **system-wide dark/light mode toggle**, accessible from the title bar:

- **Light Mode** — The default macOS-inspired look: white cards, light gray backgrounds, subtle shadows, dark text
- **Dark Mode** — A full dark theme: near-black backgrounds (#1D1D1F), dark gray cards (#2C2C2E), muted borders, white text, and accent colors that pop against the dark surface
- Toggle is a **sun/moon icon** in the title bar — one click switches the entire app instantly
- The round table wood texture adjusts: warmer golden tones in light mode, deeper rich tones in dark mode
- All widgets, modals, dock, sidebar, calendar, chat, and overlays respect the theme
- Preference is saved locally so it persists across sessions

### 4. Shared Calendar

A full interactive calendar that aggregates events from **all your tables**:

- **Monthly grid view** — Clean, spacious calendar with days showing event pills color-coded by their source table
- **Click any day to add** — Tap a date and a modal opens pre-filled with that date, where you pick a title, time, and which table to share it with
- **Navigation** — Left/right arrows to change months, "Today" button to snap back
- **Table filter chips** — Color-coded pills at the top let you filter events by table (show only "Family Circle" events, or only "Project Alpha" events)
- Events are visible to all members of the associated table

### 5. Messaging System

Built-in iMessage-style messaging between all Round Table members:

- **Thread list** — Left panel shows every member with their avatar, last message preview, timestamp, and unread dot
- **Chat view** — Right panel shows the conversation in blue (sent) and gray (received) bubbles, with timestamps
- **Real-time feel** — Messages appear instantly after sending; scroll auto-jumps to newest message
- **Quick actions from chat** — Every conversation has walkie-talkie and video call buttons in the header
- **Search bar** — Find conversations quickly
- **Supports text and email types** — The data model distinguishes between text messages and email-style messages

### 6. Walkie Talkie

A push-to-talk communication feature — like a modern digital walkie-talkie:

- **Slide-up panel** — Opens from the dock or any conversation, showing all online/away members
- **Select a member** — Pick who you want to talk to from the member list
- **Push to talk** — Hold the large green microphone button; it turns red with a pulse animation while you're talking; release to stop
- **Audio beep** — A distinctive two-tone beep (880Hz + 1100Hz, using Web Audio API) plays when you start talking or receive a ping
- **Ping notification** — When someone pings you, a toast slides in from the top-right with their avatar, name, and Answer/Dismiss buttons
- **Video call shortcut** — A blue video button below the talk button lets you escalate to video
- **Bell ping** — A bell button sends a silent ping notification to the other person
- **Real audio** — "Join Walkie Room" starts a real WebRTC group audio call; push-to-talk mutes/unmutes your live audio track, and everyone can see who's currently talking

### 7. Video Calling

Full-screen video call interface with **real WebRTC video and audio**:

- **Dark overlay** — When a call starts, the screen fills with a dark backdrop
- **Live streams** — Real peer-to-peer video and audio (mesh topology), with your own camera in a picture-in-picture corner and remote peers in a video grid; group calls supported
- **Incoming call toast** — Ring tone, caller info, Answer/Decline buttons, 30-second auto-dismiss
- **Controls** — Three circular buttons: Mute (microphone toggle), Hangup (red, ends call), Video toggle (camera on/off)
- **Accessible from anywhere** — Start calls from the messages chat header, walkie-talkie panel, or by clicking a member's seat on the table
- **Call history** — A dedicated Calls view logs every call (type, direction, duration, missed-call highlighting) with one-tap redial
- **Escape to exit** — Press Escape to end the call instantly

### 8. App Launcher

A macOS Launchpad-style grid of 24 productivity apps across three ecosystems:

**Apple (11 apps):** Photos, Pages, Numbers, Keynote, Notes, Reminders, FaceTime, Files, Music, Finder, iCloud

**Google (7 apps):** Docs, Sheets, Slides, Drive, Meet, Calendar, Gmail

**Microsoft (6 apps):** Word, Excel, PowerPoint, OneDrive, Teams, Outlook

- Each app icon has a **gradient background** matching its brand, with a Font Awesome icon
- **Platform filter buttons** — "All," "Apple," "Google," "Microsoft" — let you narrow the grid
- Clicking an app opens it in a new browser tab
- The grid is responsive and fills available space with auto-sizing columns

### 9. File Sharing & Collaboration

When you're viewing a table, you can share any type of content:

- **"Share Item" button** — Opens a modal with two sharing methods:
  1. **Drag & drop zone** — Drag files from your desktop directly into the drop zone, or click to open a native file picker. File types are auto-detected (image/ = photo, video/ = video, audio/ = audio, everything else = document)
  2. **Quick share buttons** — 8 category buttons (Photo, Document, Video, Audio, Link, Note, Sheet, Slides) that prompt for a name and instantly add the item to the table
- **Items on the table** — Every shared item appears as a visual icon on the round table surface and in a scrollable list below the table
- **Item list** — Shows icon, name, who shared it, time ago, with Open and Edit buttons

### 10. Invite System — The Growth Engine

Round Table is designed to spread through the people who love it:

**How Invites Work:**
- From any table, click **"Invite"** to generate a shareable invite link
- Each invite has a **unique code** (e.g., `FAMILY2026`, `FAITH4ALL`) and a shareable URL
- The link can be sent via text, email, QR code, or any messaging app
- Invites have **configurable limits**: max uses (e.g., 50 people) and expiration dates (e.g., 30 days)
- When someone clicks the link, they land on an **ultra-fast onboarding page**: see the table name, see who's already there, tap "Join" — done in 2 taps

**Referral Incentives — Why People Share:**
- Every user has a **referral dashboard** showing: people they've invited, people who actually joined, and their referral badge
- **Badge progression**: Newcomer (0) → Starter (1-3 joins) → Connector (4-7 joins) → Ambassador (8+ joins)
- **Invite leaderboard** per table — see who's brought the most people to the group
- Badges are visible on your profile and in member lists — social proof that encourages sharing
- The goal: make inviting people feel **rewarding**, not spammy

**Contact Access — Frictionless Inviting:**
- Round Table can access your **device contacts** (with permission) to make inviting effortless
- Contact list shows name, phone, email, and whether they're already a Round Table member
- **One-tap invite**: tap any non-member contact → choose a table → invite sent via their phone number or email
- **Import contacts**: bulk-add contacts from your phone's address book
- Search and filter contacts by name
- Members are marked with a green checkmark so you know who's already on Round Table

### 11. Email Space — Built-In Email Client

Round Table includes a **dedicated email space** so members never need to leave the app:

- **Mini inbox** — Shows all incoming emails with sender avatar, subject, preview text, timestamp, and unread indicator
- **Folder navigation** — Switch between Inbox, Sent, and Starred folders
- **Email reading pane** — Click any email to see the full body, with reply button
- **Compose** — Write new emails with To (select a member), Subject, and Body fields
- **Star system** — Star important emails for quick access in the Starred folder
- **Unread badges** — Inbox count badge shows how many unread emails you have
- **Integrated with members** — Email recipients are Round Table members, so you see their avatar and color everywhere

### 12. Text/SMS Panel — Real Texting

Separate from in-app chat, Round Table has a **dedicated text messaging panel**:

- **Conversation list** — All text threads grouped by contact, with unread dots and last message preview
- **Chat thread** — Green bubbles (sent) and gray bubbles (received) with timestamps
- **Quick compose** — Type and send texts instantly
- **Distinct from Chat** — Texts are phone-style SMS; Chat is in-app messaging. Both live in the Communications Hub but are clearly separated so you always know which channel you're in

---

## Design Language

Round Table is designed to feel like **a native macOS application**, not a web page:

- **Title bar** — Includes the classic red/yellow/green traffic light buttons and a dark/light mode toggle
- **Sidebar navigation** — Persistent left sidebar with sections for Navigation (Portal, Calendar, Messages, Apps) and Round Tables (list of all tables with live/dormant indicators)
- **macOS Dock** — A floating glass-effect dock at the bottom of the screen with icons for Portal, Round Table, Calendar, Messages, Walkie Talkie, Apps, and Notifications — with hover animations that lift and scale icons, tooltips that slide up, and red badge counts for unread messages/notifications
- **System font stack** — Uses -apple-system, BlinkMacSystemFont, SF Pro Display for authentic Apple typography
- **macOS color palette** — Blue (#007AFF), Green (#34C759), Orange (#FF9500), Red (#FF3B30), Purple (#AF52DE), Pink (#FF2D55), Yellow (#FFCC00)
- **Glass effect** — Backdrop-filter blur on the dock and title bar for depth
- **Dark mode** — Full dark theme with near-black backgrounds, muted borders, and accent colors that glow against the dark surface
- **Smooth animations** — Fade-in, scale-in, and slide-in transitions with cubic-bezier easing throughout; staggered delays on list items
- **Custom scrollbars** — Thin, rounded, translucent scrollbar thumbs
- **Card-based widgets** — White cards (or dark gray in dark mode) with subtle shadow and rounded corners
- **Modal system** — Modals animate with scale + blur backdrop
- **Keyboard shortcuts** — Escape closes any open modal, video call, or walkie-talkie panel

---

## Technical Architecture

> This is the primary full-stack build (Iteration 18a). A separate Cloudflare/Hono prototype edition is kept in its own repository (`round-table`).

### Backend (FastAPI + SQLite)
- **Framework**: FastAPI (Python) with SQLite persistence
- **Auth**: JWT in httpOnly cookies, bcrypt password hashing, register/login/logout flows
- **Real-time**: Native WebSockets at `/api/ws` — presence, chat, typing indicators, live table updates, and WebRTC signaling (offer/answer/ICE)
- **Calls**: Real WebRTC walkie-talkie and group video calls (mesh topology, Google STUN), with SQLite-backed call history
- **Push**: VAPID-based Web Push via pywebpush, with dead-subscription cleanup
- **SMS bridge**: Twilio integration for real two-way texting and opt-in "text me when I miss something" auto-SMS notifications
- **Email bridge**: Resend integration (transactional invite emails; gracefully degrades when unconfigured)
- **AI**: Claude (Anthropic SDK) powers smart event suggestions per table
- **Files**: Local disk-backed uploads with metadata in SQLite, protected downloads, in-app viewer with co-viewing ("Present to Table") sync
- **Data safety**: Soft-delete/trash system with 30-day recovery across invites, emails, messages, call logs, items, events, contacts, and notifications

### Frontend (React 19 + Tailwind)
- **Framework**: React 19 with react-router-dom, Tailwind CSS, lucide-react icons, sonner toasts
- **PWA**: Installable, with a service worker for Web Push notifications
- **Theme**: Dark mode by default with a soft golden light mode, toggled from the title bar and persisted locally
- **Scenes**: Every table renders as a lit room with configurable Room, Table type, Tabletop, Food, Ambiance, and Music, with fixed seat slots members can claim
- **Avatars**: DiceBear stylized portrait system — 288 preset options across 12 styles
- **Gather Experience**: Cinematic investor demo at `/gather` with Room Builder, Avatar Seating, Live Table View, and guided simulation

### API Surface

The REST API (all under `/api`) covers: auth and profiles, members, tables (CRUD with owner/admin/member roles), per-table shared items with reactions, prayers, seats and scenes, file upload/download, messages (1:1 and table-scoped), emails (inbox/sent/starred/trash), texts, events (including weekly/monthly recurring), notifications, walkie pings, active calls and call history, push subscriptions, SMS/email bridges, invites (codes, max-uses, expiry, join flow), contacts, referrals and the leaderboard, and trash restore/purge. See `memory/PRD.md` for the full endpoint-by-endpoint history.

---

## Data Model

### Members
Each member has: id, name, initials, color (avatar background), and status (online/away/offline).

### Tables
Each table has: id, name, member list, shared items, theme color, active flag, list of currently active member IDs, and last activity timestamp.

### Shared Items
Each item has: id, type (photo/document/video/audio/link/note/spreadsheet/presentation), name, who shared it, and timestamp.

### Messages (In-App Chat)
Each message has: id, from/to user IDs, text content, timestamp, type (text/email), and read flag.

### Emails
Each email has: id, from/to user IDs, subject, body, timestamp, read flag, starred flag, and folder (inbox/sent).

### Texts (SMS)
Each text has: id, from/to user IDs, text content, timestamp, and read flag.

### Events
Each event has: id, title, date, time, associated table, color (inherited from table), and who created it.

### Notifications
Each notification has: id, type (walkie/share/event), from user, message text, timestamp, and read flag.

### Invites
Each invite has: id, table ID, unique code, creator, creation date, use count, max uses, and expiration date.

### Contacts
Each contact has: id, name, phone, email, isMember flag, and optional memberId if they're already on Round Table.

### Referrals
Each user's referral record has: invited count, joined count, and badge level (Newcomer/Starter/Connector/Ambassador).

### Scenes & Seats
Each table has a scene (room, table type, tabletop, food, ambiance, music) and a set of fixed seat slots (count determined by table type) that members claim; seat claims are unique per member and per slot.

### Prayers & Reactions
Prayer and Intention shared-item types power the per-table Prayer Wall; any shared item can carry praying/amen/heart/thanks reactions, broadcast live over WebSocket.

### Call Logs
Each call log has: call id, type (audio/video), participants, start/end timestamps, duration, and status — powering the Call History view with missed-call highlighting and redial.

### Push Subscriptions
Each subscription stores the browser's Web Push endpoint and keys per user; stale endpoints are cleaned up automatically.

---

## User Flows

### Flow 1: Sharing a Photo with Your Family
1. Open Round Table → land on the Portal
2. Click "Family Circle" in the sidebar (it's Live with a green glow)
3. See the round table with family members seated around it
4. Click "Share Item" in the header
5. Drag a photo from your desktop into the drop zone — or click the "Photo" quick share button
6. The photo icon appears on the table surface and in the shared items list
7. Family members see it immediately on their table

### Flow 2: Checking All Communications from the Portal
1. Open Round Table → land on the Portal Communications Hub
2. **Email tab** shows 2 unread emails: vacation planning from Sarah, sprint agenda from Emma
3. Click Sarah's email → read the full body → hit Reply
4. Switch to **Texts tab** → see 3 unread: Sarah running late, Mike asking about milk, James about Sunday
5. Reply to Mike: "Sure, 2% or whole?"
6. Switch to **Chat tab** → see in-app messages from team members
7. Switch to **Walkie tab** → see who's online, ping someone with one tap
8. **Never left the Portal. All communication in one view.**

### Flow 3: Inviting Someone to Your Table
1. Click "Invite" in Quick Actions or from a table view
2. Choose which table to invite to (e.g., "Faith Group")
3. An invite link is generated: `roundtable.app/join/FAITH4ALL`
4. Share via text, email, or copy the link
5. Your friend clicks the link → sees "Faith Group" with 5 members → taps "Join"
6. They're in. Your referral count goes up. Badge progresses toward "Ambassador."

### Flow 4: Setting Up a Bible Study Event
1. From the Portal dashboard, click "New Event" in Quick Actions
2. Fill in: "Bible Study", date April 16, time 7:00 PM, share with "Faith Group"
3. The event appears on the shared calendar, color-coded purple for the Faith Group
4. All 5 members of the Faith Group can see it on their calendar view

### Flow 5: Walkie-Talkie a Team Member
1. Click the walkie-talkie icon in the dock
2. The walkie panel slides up showing online members
3. Select Emma Wilson
4. Hold the green microphone button — a beep plays, the button turns red and pulses
5. Speak your message, release the button
6. Emma gets a ping notification with Answer/Dismiss buttons
7. She taps Answer and her walkie panel opens to your channel

### Flow 6: Switching to Dark Mode
1. Click the sun/moon icon in the title bar
2. The entire app instantly transitions: backgrounds go dark, cards become dark gray, text becomes white
3. The round table wood shifts to deeper tones
4. The dock glass effect adjusts for dark surfaces
5. Click again to switch back to light mode

### Flow 7: Inviting a Contact Who Isn't on Round Table Yet
1. Open the Contacts section from Quick Actions
2. See your contact list — members have a green checkmark, non-members don't
3. Tap "Invite" next to "Pastor David" (not a member yet)
4. Choose "Faith Group" as the table
5. An invite is sent to pastor.david@church.org
6. When Pastor David joins, your referral count increases and your badge progresses

---

## What Makes Round Table Different

| Feature | Round Table | Slack/Teams | Google Workspace | WhatsApp Groups |
|---------|-------------|-------------|------------------|-----------------|
| Visual group metaphor | Round table with seats | Channel list | Folder/file view | Chat list |
| Unified comms hub | Email + Text + Chat + Walkie in one | Chat only | Separate apps | Chat only |
| Built-in email client | Yes | No | Separate (Gmail) | No |
| Built-in texting | Yes | No | No | Chat only |
| Designed for families | Yes | No | No | Somewhat |
| Faith group support | Yes | No | No | Somewhat |
| Dark/Light mode | One-click toggle | Yes | Per-app | Yes (mobile) |
| Integrated calendar | Shared, color-coded | Add-on | Separate app | No |
| Walkie-talkie | Built-in push-to-talk | No | No | No |
| Viral invite system | Codes + referral badges | Workspace invite | Org admin only | Group link |
| Contact access | Import + one-tap invite | No | Google Contacts | Phone contacts |
| App launcher (Apple+Google+MS) | 24 apps, one click | App directory | Google only | No |
| macOS native feel | Yes | Electron wrapper | Web app | Mobile-first |
| File sharing on a visual surface | Items appear on table | File upload in chat | Drive folders | Media gallery |
| Live/Dormant group status | Visual glow + animation | Green dot per user | No | Last seen per user |
| Referral incentives | Badges + leaderboard | No | No | No |
| No learning curve | Sit at a table, share stuff | Channels, threads, apps | Docs, Drive, Meet, Chat | Simple but limited |

---

## The Growth Model

Round Table is designed to proliferate through its users:

1. **Value first** — The app is genuinely useful from day one for the person who creates a table
2. **Natural sharing** — You can't use a table alone. You *need* to invite people. The invite system makes this effortless
3. **Ultra-fast onboarding** — Click a link → see the table → join in 2 taps. No sign-up wall, no tutorial, no friction
4. **Incentives to share** — Referral badges (Newcomer → Starter → Connector → Ambassador) give social status for inviting
5. **Leaderboard** — Each table shows who's invited the most people, creating friendly competition
6. **Contact access** — Importing contacts means one-tap inviting for your entire address book
7. **Cross-group spread** — When someone joins your Family table, they create their own Project table and invite their coworkers. Those coworkers create Faith tables. The network grows exponentially.

**The flywheel**: More people at the table → more value → more reasons to invite → more people at the table.

---

## Roadmap

Most of the original prototype roadmap has shipped in this build: persistent SQLite storage, JWT authentication, WebSocket real-time sync, real file upload with an in-app viewer, real WebRTC walkie-talkie audio and group video calls, Web Push notifications, responsive/PWA layout, and owner/admin/member roles.

Still ahead (see `memory/PRD.md` backlog for detail):

1. **Prayer reply threads** — comments on prayers within the Prayer Wall
2. **Table roles management UI** — surface the existing role model in the interface
3. **Activity feed per table** — chronological timeline of all table actions
4. **End-to-end encryption** — secure messaging and file sharing
5. **Per-table file/folder browser**
6. **Device contact import** — bulk-add from the phone's address book
7. **Analytics dashboard** for table owners
8. **Notification preferences** per channel
9. **Embeddable "We're praying for X" widget** — church/community sites link to `/join/:code` (deferred by founder request)

---

*Round Table: One table. Every group. Everything shared. Everyone connected.*
